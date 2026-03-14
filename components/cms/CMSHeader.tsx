"use client"

export default function CMSHeader() {
  return (
    <header className="bg-deep-blue border-b border-mid-blue">
      <div className="container-main flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/brand/logo-bg-black.png"
            alt="AlignAI"
            className="h-8 w-auto"
          />
          <div>
            <h1 className="text-lg font-semibold text-white">AlignAI CMS</h1>
            <p className="text-xs text-light-slate">Content Management System</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-light-slate">admin@alignai.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}
