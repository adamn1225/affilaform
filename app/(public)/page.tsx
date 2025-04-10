import HeroSection from '@/components/sections/HeroSection';
import CallToActions from '@/components/sections/CallToActions';
import FormDemo from '@/components/sections/FormDemo';
import ShowCaseDash from '@/components/sections/ShowCaseDash';
import KeyPoints from '@/components/sections/KeyPoints';

export default function SignupPage() {
  return (
    <main>
      <HeroSection />
      <KeyPoints />
      <ShowCaseDash />
      <FormDemo />
      <CallToActions />
    </main>
  )
}