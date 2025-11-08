
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Analytics',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>

        </HelmetLayout>
    )
}
