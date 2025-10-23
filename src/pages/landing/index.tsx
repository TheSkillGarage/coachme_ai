import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import PageLayout from '../../layouts/pageslayout';
import FeaturesSection from './features';
import HeroSection from './hero';
import HowItWorks from './howitworks';
import TestimonialsSection from './testimonials';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Home',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <PageLayout>
                <HeroSection />
                <FeaturesSection />
                <HowItWorks />
                <TestimonialsSection />
            </PageLayout>
        </HelmetLayout>
    )
}
