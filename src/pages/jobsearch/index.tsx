
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Job Search',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>Job Search
            </div>
        </HelmetLayout>
    )
}
