import { getEnvs } from '@/lib/getEnv'

export function AdSesne() {
  const { VITE_ADSENSE_CLIENT_ID } = getEnvs()

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={VITE_ADSENSE_CLIENT_ID}
      data-ad-slot="9101349995"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
