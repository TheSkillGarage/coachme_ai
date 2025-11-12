import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input/input";
import Button from "../../../components/ui/button/button";
import { FilePlayIcon, Plus, Trash2 } from "lucide-react";
import * as yup from "yup";
import type { ParsedResumeData } from "../../../types";

interface PersonalData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
}

interface Experience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Education {
    degree: string;
    course: string;
    institution: string;
    graduationDate: string;
    location: string;
}

type ErrorMessages = Partial<Record<string, string | string[]>>;

interface CreateResumeProps {
    initialData?: ParsedResumeData | null;
    onSave?: () => void;
    onCancel?: () => void;
}

export default function CreateResume({ initialData, onSave, onCancel }: CreateResumeProps) {
    // Yup Schemas
    const personalSchema = yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        phone: yup.string().required("Phone number is required"),
        location: yup.string().required("Location is required"),
        summary: yup.string().required("Professional summary is required"),
    });

    const experienceSchema = yup.object().shape({
        jobTitle: yup.string().required("Job title is required"),
        company: yup.string().required("Company name is required"),
        startDate: yup.string().required("Start date is required"),
        endDate: yup.string().required("End date is required"),
        description: yup.string().required("Description is required"),
    });

    const educationSchema = yup.object().shape({
        degree: yup.string().required("Degree is required"),
        course: yup.string().required("Course is required"),
        institution: yup.string().required("Institution is required"),
        graduationDate: yup.string().required("Graduation date is required"),
        location: yup.string().required("Location is required"),
    });

    const [formData, setFormData] = useState<PersonalData>({
        firstName: initialData?.personal?.firstName || "",
        lastName: initialData?.personal?.lastName || "",
        email: initialData?.personal?.email || "",
        phone: initialData?.personal?.phone || "",
        location: initialData?.personal?.location || "",
        summary: initialData?.personal?.summary || "",
    });

    const [experiences, setExperiences] = useState<Experience[]>(
        initialData?.experiences && initialData.experiences.length > 0
            ? initialData.experiences
            : [{ jobTitle: "", company: "", startDate: "", endDate: "", description: "" }]
    );

    const [educations, setEducations] = useState<Education[]>(
        initialData?.educations && initialData.educations.length > 0
            ? initialData.educations
            : [{ degree: "", course: "", institution: "", graduationDate: "", location: "" }]
    );

    const [skills, setSkills] = useState<string>(
        initialData?.skills?.join(", ") || ""
    );

    const [errors, setErrors] = useState<{
        personal?: ErrorMessages;
        experiences?: ErrorMessages[];
        educations?: ErrorMessages[];
    }>({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.personal?.firstName || "",
                lastName: initialData.personal?.lastName || "",
                email: initialData.personal?.email || "",
                phone: initialData.personal?.phone || "",
                location: initialData.personal?.location || "",
                summary: initialData.personal?.summary || "",
            });

            if (initialData.experiences && initialData.experiences.length > 0) {
                setExperiences(initialData.experiences);
            }

            if (initialData.educations && initialData.educations.length > 0) {
                setEducations(initialData.educations);
            }

            if (initialData.skills && initialData.skills.length > 0) {
                setSkills(initialData.skills.join(", "));
            }
        }
    }, [initialData]);

    // Handlers
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        try {
            await personalSchema.validateAt(name, { ...formData, [name]: value });
            setErrors((prev) => ({ ...prev, personal: { ...prev.personal, [name]: undefined } }));
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                setErrors((prev) => ({ ...prev, personal: { ...prev.personal, [name]: err.message } }));
            }
        }
    };

    const handleExperienceChange = async (index: number, field: keyof Experience, value: string) => {
        const updated = [...experiences];
        updated[index][field] = value;
        setExperiences(updated);

        try {
            await experienceSchema.validateAt(field, updated[index]);
            setErrors((prev) => {
                const newErrors = prev.experiences ? [...prev.experiences] : [];
                if (!newErrors[index]) newErrors[index] = {};
                newErrors[index][field] = undefined;
                return { ...prev, experiences: newErrors };
            });
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                setErrors((prev) => {
                    const newErrors = prev.experiences ? [...prev.experiences] : [];
                    if (!newErrors[index]) newErrors[index] = {};
                    newErrors[index][field] = err.message;
                    return { ...prev, experiences: newErrors };
                });
            }
        }
    };

    const handleEducationChange = async (index: number, field: keyof Education, value: string) => {
        const updated = [...educations];
        updated[index][field] = value;
        setEducations(updated);

        try {
            await educationSchema.validateAt(field, updated[index]);
            setErrors((prev) => {
                const newErrors = prev.educations ? [...prev.educations] : [];
                if (!newErrors[index]) newErrors[index] = {};
                newErrors[index][field] = undefined;
                return { ...prev, educations: newErrors };
            });
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                setErrors((prev) => {
                    const newErrors = prev.educations ? [...prev.educations] : [];
                    if (!newErrors[index]) newErrors[index] = {};
                    newErrors[index][field] = err.message;
                    return { ...prev, educations: newErrors };
                });
            }
        }
    };

    const addExperience = async () => {
        try {
            await experienceSchema.validate(experiences[experiences.length - 1], { abortEarly: false });
            setExperiences([...experiences, { jobTitle: "", company: "", startDate: "", endDate: "", description: "" }]);
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const fieldErrors: ErrorMessages = {};
                err.inner.forEach((e) => e.path && (fieldErrors[e.path] = e.message));
                setErrors((prev) => ({ ...prev, experiences: [...(prev.experiences || []), fieldErrors] }));
            }
        }
    };

    const addEducation = async () => {
        try {
            await educationSchema.validate(educations[educations.length - 1], { abortEarly: false });
            setEducations([...educations, { degree: "", course: "", institution: "", graduationDate: "", location: "" }]);
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const fieldErrors: ErrorMessages = {};
                err.inner.forEach((e) => e.path && (fieldErrors[e.path] = e.message));
                setErrors((prev) => ({ ...prev, educations: [...(prev.educations || []), fieldErrors] }));
            }
        }
    };

    const removeExperience = (index: number) => {
        setExperiences((prev) => prev.filter((_, i) => i !== index));
        setErrors((prev) => ({
            ...prev,
            experiences: prev.experiences ? prev.experiences.filter((_, i) => i !== index) : [],
        }));
    };

    const removeEducation = (index: number) => {
        setEducations((prev) => prev.filter((_, i) => i !== index));
        setErrors((prev) => ({
            ...prev,
            educations: prev.educations ? prev.educations.filter((_, i) => i !== index) : [],
        }));
    };

    const handleSubmit = async () => {
        try {
            const personalValidation = await personalSchema
                .validate(formData, { abortEarly: false })
                .then(() => null)
                .catch((err) => err);

            const experienceValidations = await Promise.all(
                experiences.map((exp, i) =>
                    experienceSchema
                        .validate(exp, { abortEarly: false })
                        .then(() => null)
                        .catch((err) => ({ index: i, err }))
                )
            );

            const educationValidations = await Promise.all(
                educations.map((edu, i) =>
                    educationSchema
                        .validate(edu, { abortEarly: false })
                        .then(() => null)
                        .catch((err) => ({ index: i, err }))
                )
            );

            const newErrors: {
                personal?: ErrorMessages;
                experiences?: ErrorMessages[];
                educations?: ErrorMessages[];
            } = { personal: {}, experiences: [], educations: [] };

            if (personalValidation?.inner) {
                personalValidation.inner.forEach((e: yup.ValidationError) => {
                    if (e.path) newErrors.personal![e.path] = e.message;
                });
            }

            experienceValidations.forEach((res) => {
                if (res?.err?.inner) {
                    const errObj: ErrorMessages = {};
                    res.err.inner.forEach((e: yup.ValidationError) => (e.path ? (errObj[e.path] = e.message) : null));
                    newErrors.experiences![res.index] = errObj;
                }
            });

            educationValidations.forEach((res) => {
                if (res?.err?.inner) {
                    const errObj: ErrorMessages = {};
                    res.err.inner.forEach((e: yup.ValidationError) => (e.path ? (errObj[e.path] = e.message) : null));
                    newErrors.educations![res.index] = errObj;
                }
            });

            const hasErrors =
                Object.keys(newErrors.personal || {}).length > 0 ||
                newErrors.experiences!.some((e) => e && Object.keys(e).length > 0) ||
                newErrors.educations!.some((e) => e && Object.keys(e).length > 0);

            if (hasErrors) {
                setErrors(newErrors);
                return;
            }

            if (onSave) {
                onSave();
            } else {
                alert("Form submitted successfully!");
            }
        } catch (err) {
            console.error("Unexpected validation error:", err);
        }
    };
    return (
        <Card hoverable={false} className="shadow-none w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full  mx-auto py-4 sm:py-6"
            >
                <h2 className="text-2xl font-semibold mb-2">Resume Information</h2>
                <p className="text-sm text-muted-foreground mb-6">
                    {initialData
                        ? "We've extracted information from your resume. Please review and make any necessary corrections."
                        : "Fill in your resume information below."}
                </p>

                {/* Personal Section */}
                <Card className="w-full shadow-none mb-6" hoverable={false}>
                    <h3 className="text-lg font-semibold mb-4">Personal</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {["firstName", "lastName", "email", "phone", "location"].map((field) => (
                            <div key={field}>
                                <Input
                                    label={field === "firstName" ? "First Name"
                                        : field === "lastName" ? "Last Name"
                                            : field.charAt(0).toUpperCase() + field.slice(1)}
                                    name={field}
                                    value={formData[field as keyof PersonalData]}
                                    onChange={handleChange}
                                    placeholder={field === "email" ? "example@gmail.com" : field}
                                    className="w-full"
                                />
                                {errors.personal?.[field] && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.personal[field]}
                                    </p>
                                )}
                            </div>
                        ))}

                    </div>
                    <div className="mt-4">
                        <label className="text-sm font-medium mb-1 block">Professional Summary</label>
                        <textarea
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            placeholder="Experienced software developer with 5+ years of experience..."
                            className="w-full border rounded-lg p-3 text-sm bg-background focus:ring-2 focus:ring-primary"
                            rows={4}
                        />
                        {errors.personal?.summary && <p className="text-red-500 text-xs mt-1">{errors.personal.summary}</p>}
                    </div>
                </Card>

                {/* Experience Section */}
                <Card className="mt-6 shadow-none w-full" hoverable={false}>
                    <AnimatePresence>
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative py-4 bg-muted/20 mb-4 shadow-none w-full">
                                    <h3 className="text-lg font-semibold mb-4">Experience</h3>
                                    {index > 0 && (
                                        <button
                                            onClick={() => removeExperience(index)}
                                            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                        {(["jobTitle", "company", "startDate", "endDate"] as (keyof Experience)[]).map((field) => (
                                            <div key={field}>
                                                <Input
                                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                                    value={exp[field]}
                                                    onChange={(e) => handleExperienceChange(index, field, e.target.value)}
                                                    placeholder={field === "jobTitle" ? "Senior Frontend Developer" : field}
                                                    className="w-full"
                                                />
                                                {errors.experiences?.[index]?.[field] && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.experiences[index][field]}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-sm font-medium mb-1 block">Description</label>
                                        <textarea
                                            value={exp.description}
                                            onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                                            placeholder="Led development of the company’s flagship product using React and TypeScript..."
                                            className="w-full border rounded-lg p-3 text-sm bg-background focus:ring-2 focus:ring-primary"
                                            rows={3}
                                        />
                                        {errors.experiences?.[index]?.description && (
                                            <p className="text-red-500 text-xs mt-1">{errors.experiences[index].description}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <Button
                        variant="outline"
                        className="w-full text-primary-500 my-4"
                        icon={<Plus />}
                        iconPosition="left"
                        onClick={addExperience}
                    >
                        Add Another Experience
                    </Button>
                </Card>

                {/* Education Section */}
                <Card className="mt-6 shadow-none w-full" hoverable={false}>
                    <AnimatePresence>
                        {educations.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative py-4 bg-muted/20 mb-4 shadow-none w-full">
                                    <h3 className="text-lg font-semibold mb-4">Education</h3>
                                    {index > 0 && (
                                        <button
                                            onClick={() => removeEducation(index)}
                                            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                        {(["degree", "course", "institution", "graduationDate", "location"] as (keyof Education)[]).map(
                                            (field) => (
                                                <div key={field}>
                                                    <Input
                                                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                                                        value={edu[field]}
                                                        onChange={(e) => handleEducationChange(index, field, e.target.value)}
                                                        placeholder={field}
                                                        className="w-full"
                                                    />
                                                    {errors.educations?.[index]?.[field] && (
                                                        <p className="text-red-500 text-xs mt-1">{errors.educations[index][field]}</p>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <Button
                        variant="outline"
                        className="w-full text-primary-500 mt-4 my-4"
                        icon={<Plus />}
                        iconPosition="left"
                        onClick={addEducation}
                    >
                        Add Another Education
                    </Button>
                </Card>

                {/* Skills Section */}
                <Card className="mt-6 shadow-none w-full" hoverable={false}>
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    <Input
                        label="Skills"
                        placeholder="React, TypeScript, Node.js, etc."
                        className="w-full"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />
                </Card>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
                    <Button variant="outline" className="text-gray-500 w-full sm:w-auto border-gray-500" onClick={onCancel} >
                        Cancel
                    </Button>
                    <Button icon={<FilePlayIcon className="w-4 h-4" />}
                        iconPosition="left" onClick={handleSubmit} className="w-full sm:w-auto">
                        Save Changes
                    </Button>
                </div>
            </motion.div>
        </Card>
    );
}
