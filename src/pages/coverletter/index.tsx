
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Cover Letter',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>Cover Letter
            </div>
        </HelmetLayout>
    )
}
