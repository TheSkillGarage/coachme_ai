
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import EditResume from '../resume/create-edit/edit';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Analytics',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            {/* <CreateResume /> */}
            <EditResume />
        </HelmetLayout>
    )
}
