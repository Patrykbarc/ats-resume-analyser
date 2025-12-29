import { getEnvs } from '@/lib/getEnv'
import {
  AlertCircle,
  Cookie,
  Eye,
  FileText,
  Lock,
  LucideProps,
  Mail,
  Shield,
  Users
} from 'lucide-react'
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'

type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>

type Section = {
  id: string
  icon: LucideIcon
  title: string
  content: ReactNode
}

export const sectionsData: Section[] = [
  {
    id: 'data-collection',
    icon: FileText,
    title: '1. Information We Collect',
    content: (
      <>
        <h3 className="text-lg font-semibold text-card-foreground">
          Personal Information
        </h3>
        <p>
          We collect information that you provide directly to us, including:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Account information (name, email address, password)</li>
          <li>Resume content and files you upload for analysis</li>
          <li>
            Payment information (processed securely by third-party payment
            processors)
          </li>
          <li>Communication preferences and correspondence with us</li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-card-foreground">
          Automatically Collected Information
        </h3>
        <p>
          When you use our service, we automatically collect certain
          information, including:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Device information (IP address, browser type, operating system)
          </li>
          <li>Usage data (pages visited, features used, time spent on site)</li>
          <li>Analytics data to improve our service</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </>
    )
  },
  {
    id: 'data-usage',
    icon: Eye,
    title: '2. How We Use Your Information',
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Provide, maintain, and improve our resume analysis service</li>
          <li>
            Process your resume files and deliver AI-powered analysis results
          </li>
          <li>Create and manage your user account</li>
          <li>Process payments and prevent fraud</li>
          <li>
            Send you service updates, security alerts, and administrative
            messages
          </li>
          <li>
            Respond to your comments, questions, and customer service requests
          </li>
          <li>Analyze usage patterns to improve user experience</li>
          <li>
            Comply with legal obligations and enforce our terms of service
          </li>
        </ul>
      </>
    )
  },
  {
    id: 'data-sharing',
    icon: Users,
    title: '3. Sharing Your Information',
    content: (
      <>
        <p>
          We do not sell your personal information. We may share your
          information in the following situations:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Service Providers:</strong> With third-party vendors who
            perform services on our behalf (cloud hosting, payment processing,
            analytics)
          </li>
          <li>
            <strong>Legal Requirements:</strong> When required by law or to
            protect our rights and safety
          </li>
          <li>
            <strong>Business Transfers:</strong> In connection with a merger,
            acquisition, or sale of assets
          </li>
          <li>
            <strong>With Your Consent:</strong> When you explicitly authorize us
            to share specific information
          </li>
        </ul>
        <p className="mt-4">
          All third-party service providers are contractually obligated to
          maintain the confidentiality and security of your information.
        </p>
      </>
    )
  },
  {
    id: 'data-security',
    icon: Lock,
    title: '4. Data Security',
    content: (
      <>
        <p>
          We implement appropriate technical and organizational security
          measures to protect your personal information, including:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Encryption of data in transit (TLS/SSL) and at rest</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Secure backup and disaster recovery procedures</li>
          <li>Employee training on data protection and privacy</li>
        </ul>
        <p className="mt-4">
          However, no method of transmission over the Internet or electronic
          storage is 100% secure. While we strive to protect your personal
          information, we cannot guarantee absolute security.
        </p>
      </>
    )
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: '5. Cookies and Tracking Technologies',
    content: (
      <>
        <p>We use cookies and similar tracking technologies to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Maintain your login session and preferences</li>
          <li>Understand how you use our service</li>
          <li>Improve site performance and user experience</li>
          <li>Deliver relevant content and advertisements</li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-card-foreground">
          Types of Cookies We Use
        </h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Essential Cookies:</strong> Required for basic site
            functionality
          </li>
          <li>
            <strong>Performance Cookies:</strong> Help us understand how
            visitors interact with our site
          </li>
          <li>
            <strong>Functional Cookies:</strong> Remember your preferences and
            settings
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Collect information about site
            usage patterns
          </li>
        </ul>

        <p className="mt-4">
          You can control cookies through your browser settings. However,
          disabling cookies may limit your ability to use certain features of
          our service.
        </p>
      </>
    )
  },
  {
    id: 'user-rights',
    icon: Shield,
    title: '6. Your Privacy Rights',
    content: (
      <>
        <p>
          Depending on your location, you may have the following rights
          regarding your personal information:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Access:</strong> Request a copy of the personal information
            we hold about you
          </li>
          <li>
            <strong>Correction:</strong> Request correction of inaccurate or
            incomplete information
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal
            information
          </li>
          <li>
            <strong>Portability:</strong> Request transfer of your data to
            another service
          </li>
          <li>
            <strong>Objection:</strong> Object to processing of your personal
            information
          </li>
          <li>
            <strong>Restriction:</strong> Request restriction of processing in
            certain circumstances
          </li>
          <li>
            <strong>Withdraw Consent:</strong> Withdraw consent for data
            processing where consent was the basis
          </li>
        </ul>

        <p className="mt-4">
          To exercise these rights, please contact us at{' '}
          <a
            href={`mailto:${getEnvs().VITE_CONTACT_EMAIL}`}
            className="text-primary hover:underline"
          >
            {getEnvs().VITE_CONTACT_EMAIL}
          </a>
          . We will respond to your request within 30 days.
        </p>
      </>
    )
  },
  {
    id: 'data-retention',
    icon: AlertCircle,
    title: '7. Data Retention',
    content: (
      <>
        <p>We retain your personal information for as long as necessary to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Provide you with our services</li>
          <li>Comply with legal obligations</li>
          <li>Resolve disputes and enforce our agreements</li>
        </ul>
        <p className="mt-4">
          When you delete your account, we will delete or anonymize your
          personal information within 90 days, except where we are required by
          law to retain certain information for longer periods.
        </p>
      </>
    )
  },
  {
    id: 'children',
    icon: Users,
    title: "8. Children's Privacy",
    content: (
      <>
        <p>
          Our service is not intended for children under 16 years of age. We do
          not knowingly collect personal information from children under 16. If
          you are a parent or guardian and believe your child has provided us
          with personal information, please contact us immediately.
        </p>
      </>
    )
  },
  {
    id: 'changes',
    icon: FileText,
    title: '9. Changes to This Privacy Policy',
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time. When we make
          changes, we will revise the &quot;Last updated&quot; date at the top
          of this policy. We will notify you of any material changes by:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Posting a notice on our website</li>
          <li>Sending you an email notification</li>
          <li>Displaying a prominent notice within our service</li>
        </ul>
        <p className="mt-4">
          We encourage you to review this Privacy Policy periodically to stay
          informed about how we protect your information.
        </p>
      </>
    )
  },
  {
    id: 'contact',
    icon: Mail,
    title: '10. Contact Us',
    content: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please contact us:
        </p>
        <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
          <dl className="space-y-2">
            <div>
              <dt className="font-semibold text-foreground">Email:</dt>
              <dd>
                <a
                  href={`mailto:${getEnvs().VITE_CONTACT_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {getEnvs().VITE_CONTACT_EMAIL}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </>
    )
  }
]
