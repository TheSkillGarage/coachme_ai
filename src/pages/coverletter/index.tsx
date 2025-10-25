
import { useState } from 'react';
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import CustomSelect from '../../components/ui/advanceSelect';
import RichTextEditor from '../../components/ui/editor';
export default function Main() {
    const tags: HelmetProps = {
        pageTitle: 'Cover Letter',
        description: ""
    }
    const [single, setSingle] = useState<string>("");
    const [multi, setMulti] = useState<string[]>([]);

    const options = [
        { label: "Frontend Developer", value: "frontend" },
        { label: "Backend Developer", value: "backend" },
        { label: "UI/UX Designer", value: "uiux" },
        { label: "Project Manager", value: "pm" },
    ];

    const handleSave = (content: string) => {
        console.log('Saved content:', content);
    };


    return (
        <HelmetLayout {...tags}>
            <div className="max-w-md mx-auto mt-10 flex flex-col gap-6">
                {/* Single Select */}
                <CustomSelect
                    label="Select a role"
                    placeholder="Choose one..."
                    options={options}
                    value={single}
                    onChange={(v) => setSingle(v as string)}
                />

                {/* Multi Select */}
                <CustomSelect
                    label="Select multiple skills"
                    placeholder="Choose multiple..."
                    options={options}
                    value={multi}
                    onChange={(v) => setMulti(v as string[])}
                    multiple
                    searchable
                />
            </div>
            <RichTextEditor
                title="Edit Blog Post"
                subtitle="Modify your article content."
                defaultContent="This is editable text."
                onSave={handleSave}
                saveButtonText="Update"
            />
        </HelmetLayout>
    )
}
