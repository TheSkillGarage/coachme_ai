
import HelmetLayout, { type HelmetProps } from "../../layouts/helmetlayout";
import SettingsForm from "./setting";


export default function Main() {
    const tags: HelmetProps = {
        pageTitle: "Settings",
        description: "",
    };



    return (
        <HelmetLayout {...tags}>
            <div className="flex flex-col mb-8">
                {/* Settings form */}
                <SettingsForm />
            </div>

        </HelmetLayout>
    );
}
