
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import PageLayout from '../../layouts/pageslayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Home',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <PageLayout>
                <div className=''>landing page
                </div>
            </PageLayout>
        </HelmetLayout>
    )
}
