import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import CustomSelect from "../../components/ui/advanceSelect";
import { Input } from "../../components/ui/input/input";
import { Switch } from "../../components/ui/switch";
import { Eye, EyeOff, FilePlayIcon, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/ui/button/button";
import SaveDialog from "./saveDialog";
import useInterceptNavigation from "../../utils/interception";

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

interface IndexableObject {
    [key: string]: never;
}


/**
 * Performs a deep equality check between two values.
 *
 * Recursively compares all keys and nested values to determine
 * if two objects, arrays, or primitive values are structurally identical.
 * 
 * This is used to detect "dirty" form states in React — for example,
 * checking if a form's current state differs from its initial state.
 *
 * @template T - The type of objects being compared.
 * @param {T} obj1 - The first object or value to compare.
 * @param {T} obj2 - The second object or value to compare.
 * @returns {boolean} True if both values are deeply equal, otherwise false.
 *
 * @example
 * deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // true
 * deepEqual([1, 2], [1, 2]); // true
 * deepEqual({ a: 1 }, { a: 2 }); // false
 */

function deepEqual<T>(obj1: T, obj2: T): boolean {
    if (obj1 === obj2) return true;

    if (
        typeof obj1 !== "object" ||
        obj1 === null ||
        typeof obj2 !== "object" ||
        obj2 === null
    ) {
        return obj1 === obj2;
    }

    const typedObj1 = obj1 as IndexableObject;
    const typedObj2 = obj2 as IndexableObject;

    const keys1 = Object.keys(typedObj1);
    const keys2 = Object.keys(typedObj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(typedObj1[key], typedObj2[key])) {
            return false;
        }
    }

    return true;
}

const INITIAL_FORM_STATE: DemographicsFormState = {
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
};

export default function SettingsForm() {
    const [form, setForm] = useState<DemographicsFormState>(INITIAL_FORM_STATE);
    const [originalForm, setOriginalForm] =
        useState<DemographicsFormState>(INITIAL_FORM_STATE);
    const [isSaveOpen, setIsSaveOpen] = useState(false);
    const [showDemographics, setShowDemographics] = useState(false);
    const [pendingPath, setPendingPath] = useState<string | null>(null);
    const navigate = useNavigate();

    const isDirty = !deepEqual(form, originalForm);

    // Load saved data
    useEffect(() => {
        const saved = localStorage.getItem("demographicsForm");
        if (saved) {
            const parsedForm = JSON.parse(saved);
            setForm(parsedForm);
            setOriginalForm(parsedForm);
        }
    }, []);

    // Intercept navigation if form is dirty
    useInterceptNavigation({
        isDirty,
        onAttemptNavigate: (nextPath) => {
            setPendingPath(nextPath);
            setIsSaveOpen(true);
        },
    });

    // Warn before refreshing or closing the tab
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    // Save handler
    const handleSave = useCallback(() => {
        localStorage.setItem("demographicsForm", JSON.stringify(form));
        setOriginalForm(form);
        console.log("Settings saved!");
        if (pendingPath) {
            navigate(pendingPath);
        }
        setIsSaveOpen(false);
    }, [form, pendingPath, navigate]);

    // Discard handler
    const handleDiscard = useCallback(() => {
        setForm(originalForm);
        if (pendingPath) {
            navigate(pendingPath);
        }
        setIsSaveOpen(false);
    }, [originalForm, pendingPath, navigate]);

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
        <div>
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold text-grey-500">
                        Application Settings
                    </h1>
                    <p className="text-sm text-grey-300">
                        Manage your job application preferences and auto-fill information
                    </p>
                </div>

                {/* Desktop Save Button */}
                <div className="hidden sm:block">
                    <Button
                        className="bg-[#67005E] hover:bg-[#52004A] text-white rounded-lg flex items-center gap-2 px-4 py-2"
                        icon={<FilePlayIcon className="w-4 h-4" />}
                        iconPosition="left"
                        onClick={handleSave}
                        disabled={!isDirty}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>

            <Card hoverable={false} className="flex flex-col shadow-none gap-8 mx-auto pb-10">
                {/* Demographics Section */}
                <Card hoverable={false} className="p-6 border border-gray-200 shadow-none rounded-2xl">
                    <div
                        className="flex items-center justify-between mb-6 cursor-pointer"
                        onClick={() => setShowDemographics(!showDemographics)}
                    >
                        <div className="flex flex-col gap-2">
                            <h2 className="font-semibold text-lg text-gray-900">
                                Demographics Information
                            </h2>
                            <p className="text-sm text-gray-500 w-[90%]">
                                This information is used to auto-fill demographics forms in job
                                applications. It's completely optional and kept private
                            </p>
                        </div>
                        {showDemographics ? (
                            <EyeOff className="transition-transform sm:w-8 sm:h-8" />
                        ) : (
                            <Eye className="transition-transform sm:w-8 sm:h-8" />
                        )}
                    </div>

                    {/* Hidden view */}
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
                                    This information is encrypted and only used for auto-filling
                                    applications.
                                </p>
                                <p className="text-sm">
                                    Click the eye icon to view and edit demographics information.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Expanded form */}
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
                                    <h3 className="text-sm font-medium text-gray-700">
                                        Race/Ethnicity (Optional)
                                    </h3>
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
                                        {["Male", "Female", "Non-binary", "Prefer not to answer"].map(
                                            (g) => (
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
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Veteran */}
                                <div className="space-y-3 border-t border-gray-200 pb-3 pt-3">
                                    <h3 className="text-sm font-medium text-gray-700">
                                        Veteran Status (Optional)
                                    </h3>
                                    <div className="flex flex-col gap-2">
                                        {[
                                            "I am a veteran",
                                            "I am not a veteran",
                                            "Prefer not to answer",
                                        ].map((v) => (
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
                                    <h3 className="text-sm font-medium text-gray-700">
                                        Disability Status (Optional)
                                    </h3>
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

                {/* Work Authorization */}
                <Card hoverable={false} className="p-6 border border-gray-200 shadow-none rounded-2xl">
                    <div className="flex items-start gap-3 mb-6">
                        <div className="flex-1">
                            <h2 className="font-semibold text-lg text-gray-900">
                                Work Authorization
                            </h2>
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
                                    <Input className="h-8 text-xs w-28 border-none border-b-gray-300" />
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

                {/* AI Application Settings */}
                <Card hoverable={false} className="p-6 border border-gray-200 shadow-none rounded-2xl">
                    <div className="flex items-start gap-3 mb-6">
                        <div className="flex-1">
                            <h2 className="font-semibold text-lg text-gray-900">
                                AI Application Settings
                            </h2>
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
                                <p className="text-sm text-grey-300">
                                    Allow AI to automatically apply to relevant jobs
                                </p>
                            </div>
                            <Switch
                                checked={form.enableAI}
                                onChange={(v: boolean) => handleSwitchChange("enableAI", v)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">
                                Application Frequency
                            </label>
                            <CustomSelect
                                options={[
                                    { label: "Select frequency", value: "" },
                                    { label: "Conservative (2-3 per day)", value: "daily" },
                                    { label: "Moderate (5-7 per day)", value: "moderate" },
                                    { label: "Aggressive (10+ per day)", value: "aggressive" },
                                ]}
                                value={form.applicationFrequency}
                                onChange={(v) => handleRadioChange("applicationFrequency", v)}
                                className="rounded-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">
                                Job Match Threshold
                            </label>
                            <CustomSelect
                                options={[
                                    { label: "Select match threshold", value: "" },
                                    { label: "High Match (90%+ compatibility)", value: "high" },
                                    { label: "Medium Match (70%+ compatibility)", value: "medium" },
                                    { label: "Low Match (below 70% compatibility)", value: "low" },
                                ]}
                                value={form.jobMatchThreshold}
                                onChange={(v) => handleRadioChange("jobMatchThreshold", v)}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </Card>

                {/* Auto-fill Settings */}
                <Card hoverable={false} className="p-6 border border-gray-200 shadow-none rounded-2xl">
                    <div className="flex items-start gap-3 mb-6">
                        <div className="flex-1">
                            <h2 className="font-semibold text-lg text-gray-900">
                                Auto-fill settings
                            </h2>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 pt-6">
                        <div className="flex justify-between items-center">
                            <div className="w-[88%]">
                                <h2 className="text-sm font-medium text-gray-700">
                                    Enable Auto-fill
                                </h2>
                                <p className="text-sm text-grey-300">
                                    Automatically fill application forms with saved information
                                </p>
                            </div>
                            <Switch
                                checked={form.enableAutofill}
                                onChange={(v: boolean) => handleSwitchChange("enableAutofill", v)}
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="w-[88%]">
                                <h2 className="text-sm font-medium text-gray-700">
                                    Notify Before Auto-fill
                                </h2>
                                <p className="text-sm text-grey-300">
                                    Show confirmation before submitting pre-filled data
                                </p>
                            </div>
                            <Switch
                                checked={form.notifyBeforeAutofill}
                                onChange={(v: boolean) =>
                                    handleSwitchChange("notifyBeforeAutofill", v)
                                }
                            />
                        </div>
                    </div>
                </Card>
            </Card>

            {/* Save Dialog */}
            <SaveDialog
                isOpen={isSaveOpen}
                onSave={handleSave}
                onDiscard={handleDiscard}
                onClose={() => setIsSaveOpen(false)}
            />
        </div>
    );
}
