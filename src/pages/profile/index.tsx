
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Profile',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>Profile
            </div>
        </HelmetLayout>
    )
}
