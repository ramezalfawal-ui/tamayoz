import { useState, useEffect, useCallback } from 'react'
import { getOrCreateCandidate, updateCandidate, getSkills, upsertScores, upsertSkills } from '../lib/db'
import type { CandidateRow } from '../lib/database.types'

export function useCandidate(userId: string | null | undefined) {
  const [candidate, setCandidate] = useState<CandidateRow | null>(null)
  const [skills,    setSkills]    = useState<string[]>([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    try {
      setLoading(true)
      const c = await getOrCreateCandidate(userId)
      setCandidate(c)
      const sk = await getSkills(c.id)
      setSkills(sk.map(s => s.skill_name))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => { load() }, [load])

  const save = useCallback(async (updates: Partial<CandidateRow>) => {
    if (!candidate) return
    const updated = await updateCandidate(candidate.id, updates)
    setCandidate(updated)
    return updated
  }, [candidate])

  const saveSkills = useCallback(async (newSkills: string[]) => {
    if (!candidate) return
    await upsertSkills(candidate.id, newSkills)
    setSkills(newSkills)
  }, [candidate])

  const saveAIScore = useCallback(async (aiResult: Record<string, unknown>) => {
    if (!candidate) return
    const overall = typeof aiResult.overall === 'number' ? aiResult.overall : 0
    const scores  = Array.isArray(aiResult.scores) ? aiResult.scores as Array<{ score: number }> : []
    await upsertScores(candidate.id, {
      overall,
      readiness:     overall,
      interview:     scores[2] ? scores[2].score * 10 : 0,
      communication: scores[5] ? scores[5].score * 10 : 0,
    }, aiResult)
  }, [candidate])

  return { candidate, skills, loading, error, save, saveSkills, saveAIScore, reload: load }
}