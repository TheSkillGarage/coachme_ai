
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'User Dashboard',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>User
            </div>
        </HelmetLayout>
    )
}
