
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import PageLayout from '../../layouts/pageslayout';
import FeaturesSection from './features';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Home',
        description: ""
    }
    const section = document.querySelector('features');
    console.log("Found section:", section);
    return (
        <HelmetLayout {...tags}>
            <PageLayout>
                <FeaturesSection />
            </PageLayout>
        </HelmetLayout>
    )
}
