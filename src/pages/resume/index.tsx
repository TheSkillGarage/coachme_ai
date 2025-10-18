
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Resume',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>Resume
            </div>
        </HelmetLayout>
    )
}
