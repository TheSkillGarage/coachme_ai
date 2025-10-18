
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Applications',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>Applications
            </div>
        </HelmetLayout>
    )
}
