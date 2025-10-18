
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Settings',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>Settings
            </div>
        </HelmetLayout>
    )
}
