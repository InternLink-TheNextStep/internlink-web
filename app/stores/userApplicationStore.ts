import { baseApi } from '@/core/api/base-api'
import { defineStore } from 'pinia'

export type ApplicationStatusNumber = 1 | 2 | 3 | 4
export type ApplicationStatusString = 'Pending' | 'Interviewed' | 'Hired' | 'Rejected'

export interface Application {
  applicationId: number
  internshipId: number
  slug: string
  appliedDate: string
  title: string
  file: string
  companyName: string
  statusNumber: ApplicationStatusNumber
  status: ApplicationStatusString
  type: string
}

interface AppliedInternshipsResponse {
  data: {
    items: any[]
  }
}

// map backend integer to label
const STATUS_MAP: Record<ApplicationStatusNumber, ApplicationStatusString> = {
  1: 'Pending',
  2: 'Interviewed',
  3: 'Hired',
  4: 'Rejected'
}

export const useApplicationStore = defineStore('application', () => {
  // state
  const applications = ref<Application[]>([])
  const loading = ref<boolean>(false)
  const error = ref<Error | null>(null)

  let fetchPromise: Promise<void> | null = null

  // fetch once, with optional force refresh
  const fetchApplications = async (force = false): Promise<void> => {
    if (!force && applications.value.length > 0) return

    if (fetchPromise) {
      await fetchPromise
      return
    }

    fetchPromise = (async () => {
      loading.value = true
      error.value = null

      try {
        const response = await baseApi<AppliedInternshipsResponse>(
          'internships/applied'
        )

        applications.value = response.data.items.map(
          (app): Application => ({
            applicationId: app.id,
            internshipId: app.internship.id,
            slug: app.internship.slug,
            appliedDate: app.created_at,
            title: app.internship.title,
            file: app.internship.file_path,
            companyName: app.internship.company.name,
            statusNumber: app.status as ApplicationStatusNumber,
            status: STATUS_MAP[app.status as ApplicationStatusNumber],
            type: app.internship.type
          })
        )
      } catch (err) {
        error.value = err as Error
      } finally {
        loading.value = false
        fetchPromise = null
      }
    })()

    await fetchPromise
  }

  // getters for tabs (example: show Pending, Interviewed, Hired)
  const pending = computed(() =>
    applications.value.filter(a => a.statusNumber === 1)
  )
  const interviewed = computed(() =>
    applications.value.filter(a => a.statusNumber === 2)
  )
  const hired = computed(() =>
    applications.value.filter(a => a.statusNumber === 3)
  )
  const rejected = computed(() =>
    applications.value.filter(a => a.statusNumber === 4)
  )

  return {
    applications,
    pending,
    interviewed,
    hired,
    rejected,
    loading,
    error,
    fetchApplications
  }
})
