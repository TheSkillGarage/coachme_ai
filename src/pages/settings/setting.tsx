import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import CustomSelect from "../../components/ui/advanceSelect";
import { Input } from "../../components/ui/input/input";
import { Switch } from "../../components/ui/switch";
import { Eye, EyeOff, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DemographicsFormState {
    race: string[];
    gender: string;
    veteranStatus: string;
    disabilityStatus: string;
    workRegions: string[];
    visaSponsorship: string;
    enableAI: boolean;
    applicationFrequency: string;
    jobMatchThreshold: string;
    enableAutofill: boolean;
    notifyBeforeAutofill: boolean;
}

export default function SettingsForm() {
    const [form, setForm] = useState<DemographicsFormState>({
        race: [],
        gender: "",
        veteranStatus: "",
        disabilityStatus: "",
        workRegions: [],
        visaSponsorship: "",
        enableAI: true,
        applicationFrequency: "",
        jobMatchThreshold: "",
        enableAutofill: true,
        notifyBeforeAutofill: true,
    });

    const [showDemographics, setShowDemographics] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("demographicsForm");
        if (saved) setForm(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("demographicsForm", JSON.stringify(form));
    }, [form]);

    const toggleArrayValue = (key: keyof DemographicsFormState, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: (prev[key] as string[]).includes(value)
                ? (prev[key] as string[]).filter((v) => v !== value)
                : [...(prev[key] as string[]), value],
        }));
    };

    const handleRadioChange = (key: keyof DemographicsFormState, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handleSwitchChange = (key: keyof DemographicsFormState, value: boolean) => {
        setForm({ ...form, [key]: value });
    };

    return (
        <Card hoverable={false} className="flex flex-col shadow-none gap-8 mx-auto pb-10">
            {/*Demographics Information */}
            <Card hoverable={false} className="p-6 border border-gray-200 shadow-none rounded-2xl">
                {/* Heade */}
                <div
                    className="flex items-center justify-between mb-6 cursor-pointer"
                    onClick={() => setShowDemographics(!showDemographics)}
                >
                    <div className="flex flex-col gap-2">

                        <h2 className="font-semibold text-lg text-gray-900">Demographics Information</h2>

                        <p className="text-sm text-gray-500 w-[90%]">
                            This information is used to auto-fill demographics forms in job applications. It's completely optional and kept private</p>
                    </div>
                    {showDemographics ? (
                        <EyeOff className="transition-transform sm:w-8 sm:h-8 w-18 h-18 mt-[-130px] sm:mt-[-60px]" />
                    ) : (
                        <Eye className="transition-transform sm:w-8 sm:h-8 w-18 h-18 mt-[-130px] sm:mt-[-60px]" />
                    )}
                </div>

                {/* Shield section when demographics are hidden */}
                <AnimatePresence>
                    {!showDemographics && (
                        <motion.div
                            key="shield"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-gray-400 space-y-2"
                        >
                            <Shield className="h-15 w-15" />
                            <p className="text-sm">
                                This information is encrypted and only used for auto-filling applications.
                            </p>
                            <p className="text-sm">Click the eye icon to view and edit demographics information.</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Demographics form section */}
                <AnimatePresence>
                    {showDemographics && (
                        <motion.div
                            key="form"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-6 pt-6 overflow-hidden"
                        >
                            {/* Race */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-gray-700">Race/Ethnicity (Optional)</h3>
                                <p className="text-xs text-gray-500">Select all that apply</p>
                                <div className="flex flex-col gap-2">
                                    {[
                                        "American",
                                        "Asian",
                                        "Black or African American",
                                        "Hispanic or Latino",
                                        "Prefer not to answer",
                                    ].map((item) => (
                                        <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                                            <Checkbox
                                                checked={form.race.includes(item)}
                                                onChange={() => toggleArrayValue("race", item)}
                                            />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="space-y-3 border-t border-gray-200 pt-6">
                                <h3 className="text-sm font-medium text-gray-700">Gender (Optional)</h3>
                                <div className="flex flex-col gap-2">
                                    {["Male", "Female", "Non-binary", "Prefer not to answer"].map((g) => (
                                        <div key={g} className="flex items-center gap-2 text-sm text-gray-700">
                                            <input
                                                type="radio"
                                                name="gender"
                                                checked={form.gender === g}
                                                onChange={() => handleRadioChange("gender", g)}
                                                className="accent-primary-600 w-4 h-4"
                                            />
                                            <span>{g}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Veteran */}
                            <div className="space-y-3 border-t border-gray-200 pb-3 pt-3">
                                <h3 className="text-sm font-medium text-gray-700">Veteran Status (Optional)</h3>
                                <div className="flex flex-col gap-2">
                                    {["I am a veteran", "I am not a veteran", "Prefer not to answer"].map((v) => (
                                        <div key={v} className="flex items-center gap-2 text-sm text-gray-700">
                                            <input
                                                type="radio"
                                                name="veteranStatus"
                                                checked={form.veteranStatus === v}
                                                onChange={() => handleRadioChange("veteranStatus", v)}
                                                className="accent-primary-600 w-4 h-4"
                                            />
                                            <span>{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Disability */}
                            <div className="space-y-3 border-t border-gray-200 pb-3 pt-3">
                                <h3 className="text-sm font-medium text-gray-700">Disability Status (Optional)</h3>
                                <div className="flex flex-col gap-2">
                                    {[
                                        "Yes, I have a disability",
                                        "No, I do not have a disability",
                                        "Prefer not to answer",
                                    ].map((d) => (
                                        <div key={d} className="flex items-center gap-2 text-sm text-gray-700">
                                            <input
                                                type="radio"
                                                name="disabilityStatus"
                                                checked={form.disabilityStatus === d}
                                                onChange={() => handleRadioChange("disabilityStatus", d)}
                                                className="accent-primary-600 w-4 h-4"
                                            />
                                            <span>{d}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>

            {/*Work Authorization */}
            <Card hoverable={false} className="p-6 border border-gray-200 shadow-none rounded-2xl">
                <div className="flex items-start gap-3 mb-6">
                    <div className="flex-1">
                        <h2 className="font-semibold text-lg text-gray-900">Work Authorization</h2>
                        <p className="text-sm text-gray-500 pr-2">
                            Specify where you’re legally allowed to work.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-6 pt-6">
                    <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">
                            Are you legally authorized to work in any of the following regions?
                        </p>
                        <div className="flex flex-col gap-2">
                            {[
                                "United States",
                                "Canada",
                                "European Union",
                                "United Kingdom",
                                "Remote (International)",
                            ].map((r) => (
                                <div key={r} className="flex items-center gap-2 text-sm text-gray-700">
                                    <Checkbox
                                        checked={form.workRegions.includes(r)}
                                        onChange={() => toggleArrayValue("workRegions", r)}
                                    />
                                    <span>{r}</span>
                                </div>
                            ))}
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={form.workRegions.includes("Other")}
                                    onChange={() => toggleArrayValue("workRegions", "Other")}
                                />
                                <span className="text-gray-700">Other</span>
                                [<Input className="h-8 text-xs w-28 border-none border-b-gray-300" />]
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">
                            Will you require visa sponsorship now or in the future?
                        </p>
                        <div className="flex flex-col gap-2">
                            {["No", "Yes"].map((opt) => (
                                <div key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        type="radio"
                                        name="visaSponsorship"
                                        checked={form.visaSponsorship === opt}
                                        onChange={() => handleRadioChange("visaSponsorship", opt)}
                                        className="accent-primary-600 w-4 h-4"
                                    />
                                    <span>{opt}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/*AI Application Settings */}
            <Card hoverable={false} className="p-6 border border-gray-200 shadow-none rounded-2xl">
                <div className="flex items-start gap-3 mb-6">
                    <div className="flex-1">
                        <h2 className="font-semibold text-lg text-gray-900">AI Application Settings</h2>
                        <p className="text-sm text-gray-500 pr-2">
                            Configure how the AI applies to jobs on your behalf.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-6 pt-6">
                    <div className="flex justify-between items-center">
                        <div className="w-[88%]">
                            <span className="text-sm font-medium text-gray-700">
                                Enable AI Application
                            </span>
                            <p className="text-sm text-grey-300">Allow AI to automatically apply to relevant jobs</p>
                        </div>
                        <Switch
                            checked={form.enableAI}
                            onChange={(v: boolean) => handleSwitchChange("enableAI", v)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">Application Frequency</label>
                        <CustomSelect
                            options={[
                                { label: "Select frequency", value: "" },
                                { label: "Conservative (2-3 per day)", value: "daily" },
                                { label: "Moderate (5-7 per day)", value: "moderate" },
                                { label: "Aggressive (10+ per day)", value: "aggressive" },
                            ]}
                            value={form.applicationFrequency}
                            onChange={(v) => setForm({ ...form, applicationFrequency: v })}
                            className="rounded-lg"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">Job Match Threshold</label>
                        <CustomSelect
                            options={[
                                { label: "Select match threshold", value: "" },
                                { label: "High Match (90%+ compatibility)", value: "high" },
                                { label: "Medium Match (70%+ compatibility)", value: "medium" },
                                { label: "Low Match (below 70% compatibility)", value: "low" },
                            ]}
                            value={form.jobMatchThreshold}
                            onChange={(v) => setForm({ ...form, jobMatchThreshold: v })}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </Card>

            {/*Auto-fill Settings */}
            <Card hoverable={false} className="p-6 border border-gray-200 shadow-none rounded-2xl">
                <div className="flex items-start gap-3 mb-6">
                    <div className="flex-1">
                        <h2 className="font-semibold text-lg text-gray-900">Auto-fill settings</h2>
                    </div>
                </div>

                <div className="flex flex-col gap-6 pt-6">
                    <div className="flex justify-between items-center">
                        <div className="w-[88%]">
                            <h2 className="text-sm font-medium text-gray-700">Enable Auto-fill</h2>
                            <p className="text-sm text-grey-300">Automatically fill application forms with saved information</p>
                        </div>
                        <Switch
                            checked={form.enableAutofill}
                            onChange={(v: boolean) => handleSwitchChange("enableAutofill", v)}
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="w-[88%]">
                            <h2 className="text-sm font-medium text-gray-700">Notify Before Auto-fill</h2>
                            <p className="text-sm text-grey-300">Show confirmation before filling sensitive information</p>
                        </div>
                        <Switch
                            checked={form.notifyBeforeAutofill}
                            onChange={(v: boolean) => handleSwitchChange("notifyBeforeAutofill", v)}
                        />
                    </div>
                </div>
            </Card>
        </Card>
    );
}
