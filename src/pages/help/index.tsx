
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Help',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>Help
            </div>
        </HelmetLayout>
    )
}
