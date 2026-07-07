import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppShellNav } from '@/components/AppShellNav'
import { OrientationBar } from '@/components/OrientationBar'
import { FloatingHelp } from '@/components/FloatingHelp'
import { BottomNav } from '@/components/BottomNav'
import { usePreferences } from '@/lib/preferences'
import { useWorkbook } from '@/lib/program'
import { Banner } from '@/components/ui'

export const Route = createFileRoute('/_app')({
  component: AppShell,
})

function AppShell() {
  const { prefs, ready: prefsReady } = usePreferences()
  const { state, ready: workbookReady } = useWorkbook(
    prefs.startDate,
    prefs.patientName,
  )
  if (!prefsReady || !workbookReady) return null

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <AppShellNav />
      <div className="flex flex-col min-h-screen">
        <OrientationBar
          currentPhase={state.currentPhase}
          currentWeek={state.currentWeek}
          currentDay={state.currentDay}
          daysRemaining={Math.max(0, state.totalDays - state.daysCompleted)}
          patientName={prefs.patientName}
          isPaused={state.isPaused}
        />
        <main className="flex-1 app-content-with-bottom-nav">
          {state.statusNotice &&
            (state.status === 'not-started' ||
              state.status === 'paused' ||
              state.status === 'final-month' ||
              state.status === 'final-14-days' ||
              state.status === 'completed') && (
              <div className="max-w-6xl mx-auto px-4 pt-4">
                <Banner
                  tone={
                    state.status === 'final-14-days'
                      ? 'sand'
                      : state.status === 'completed'
                        ? 'sky'
                        : state.status === 'paused'
                          ? 'sand'
                          : 'sand'
                  }
                  title={
                    state.status === 'completed'
                      ? 'Workbook complete — your tools stay with you'
                      : state.status === 'final-14-days'
                        ? 'Final 14 days of your guided workbook'
                        : state.status === 'final-month'
                          ? 'Final month of your guided workbook'
                          : state.status === 'paused'
                            ? 'Your workbook is paused'
                            : 'Welcome to your workbook'
                  }
                >
                  {state.statusNotice}
                </Banner>
              </div>
            )}
          <Outlet />
        </main>
      </div>
      <FloatingHelp />
      <BottomNav />
    </div>
  )
}
