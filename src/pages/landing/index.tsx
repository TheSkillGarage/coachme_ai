
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Home',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>landing page
            </div>
        </HelmetLayout>
    )
}
