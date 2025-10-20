
import { useState } from 'react';
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import Dialog from '../../components/ui/dialog';
export default function Main() {
    const [isOpen, setIsOpen] = useState(false);
    const tags: HelmetProps = {
        pageTitle: 'Resume',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>Resume

                <div className="p-10">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-primary-500 text-white rounded"
                    >
                        Open Dialog
                    </button>

                    <Dialog
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Custom Dialog"
                        className='bg-[white]'
                        footer={
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded"
                                >
                                    Cancel
                                </button>
                                <button className="px-4 py-2 bg-primary-600 text-white rounded">
                                    Confirm
                                </button>
                            </div>
                        }
                    >
                        <p>This is a custom dialog component. You can place any content here.</p>
                    </Dialog>
                </div>
            </div>
        </HelmetLayout>
    )
}
