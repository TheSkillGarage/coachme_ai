
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Notifications',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>Notifications
            </div>
        </HelmetLayout>
    )
}
