
import { FilePlayIcon } from 'lucide-react';
import Button from '../../components/ui/button/button';
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import SettingsForm from './setting';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Settings',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                    <h1 className="text-xl font-semibold text-grey-500">
                        Application Settings
                    </h1>
                    <p className="text-sm text-grey-300">
                        Manage your job application preferences and auto-fill information
                    </p>
                </div>
                <Button
                    className="mt-3 sm:mt-0 bg-[#67005E] hover:bg-[#52004A] text-white rounded-lg flex items-center gap-2 px-4 py-2"
                    icon={<FilePlayIcon className="w-4 h-4" />} iconPosition="left"
                >

                    Save Changes
                </Button>
            </div>
            <SettingsForm />
        </HelmetLayout>
    )
}
