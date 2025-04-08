import HeroSection from '@/components/sections/HeroSection';
import CallToActions from '@/components/sections/CallToActions';
import FormDemo from '@/components/sections/FormDemo';
import ShowCaseDash from '@/components/sections/ShowCaseDash';
export default function SignupPage() {
  return (
    <main>
      <HeroSection />
      <ShowCaseDash />
      <FormDemo />
      <CallToActions />
    </main>
  )
}