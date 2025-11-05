
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import ResumeInformation from '../resume/resumeinfo';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Analytics',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <ResumeInformation />
        </HelmetLayout>
    )
}
