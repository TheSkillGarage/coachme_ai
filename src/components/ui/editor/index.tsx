import React, { useState, useEffect, type CSSProperties, useRef } from 'react';
import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Check,
    X,
} from 'lucide-react';
import Button from '../button/button';
import { Card } from '../card';

// ===============================
//  Helper Components
// ===============================

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <select
        {...props}
        className={`h-9 rounded-md border border-grey-50 bg-white px-3 text-sm focus:ring-0 focus:ring-primary-500 ${className}`}
    >
        {children}
    </select>
);

const ToggleButton: React.FC<{
    value: string;
    isSelected: boolean;
    onClick: (value: string) => void;
    children: React.ReactNode;
}> = ({ value, isSelected, onClick, children }) => (
    <Button
        type="button"
        onClick={() => onClick(value)}
        variant={isSelected ? 'solid' : 'outline'}
        className={`px-2 py-1 text-sm border ${isSelected
            ? 'bg-grey-50 text-primary-500 border-gray-300'
            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
            }`}
    >
        {children}
    </Button>
);

const ToggleGroup: React.FC<{
    type?: 'single' | 'multiple';
    value: string | string[];
    onValueChange: (v: string | string[]) => void;
    children: React.ReactNode;
}> = ({ type = 'multiple', value, onValueChange, children }) => {
    const handleToggle = (val: string) => {
        if (type === 'single') {
            onValueChange(value === val ? '' : val);
        } else if (Array.isArray(value)) {
            onValueChange(
                value.includes(val) ? value.filter((v) => v !== val) : [...value, val]
            );
        }
    };

    return (
        <div className="flex border border-grey-50 rounded-xl gap-[2px] py-2 px-2 overflow-hidden">
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    const childEl = child as React.ReactElement<{
                        value: string;
                        isSelected?: boolean;
                        onClick?: (value: string) => void;
                    }>;
                    const isSelected =
                        type === 'single'
                            ? value === childEl.props.value
                            : Array.isArray(value) && value.includes(childEl.props.value);
                    return React.cloneElement(childEl, { isSelected, onClick: handleToggle });
                }
                return child;
            })}
        </div>
    );
};

// ===============================
//  Main RichTextEditor Component
// ===============================

export interface RichTextEditorProps {
    defaultContent?: string;
    onSave: (content: string) => void;
    title?: string;
    subtitle?: string;
    placeholder?: string;
    saveButtonText?: string;
    onCancel?: () => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    defaultContent = '',
    onSave,
    title = 'Rich Text Editor',
    subtitle = 'Write or edit your content below.',
    saveButtonText = 'Save',
    onCancel
}) => {
    const [content, setContent] = useState(defaultContent);
    const [fontFamily, setFontFamily] = useState('Georgia');
    const [fontSize, setFontSize] = useState('16');
    const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
    const [textColor, setTextColor] = useState('#1B1B1B');
    const [textStyle, setTextStyle] = useState<string[]>([]);
    console.log('html content', content)

    useEffect(() => {
        setContent(defaultContent);
    }, [defaultContent]);

    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (editorRef.current && defaultContent) {
            editorRef.current.innerHTML = defaultContent;
        }
    }, [defaultContent]);

    const handleSave = () => onSave(content);

    const editorStyle: CSSProperties = {
        fontFamily,
        fontSize: `${fontSize}px`,
        textAlign,
        color: textColor,
        textDecoration: textStyle.includes('underline') ? 'underline' : 'none',
        fontWeight: textStyle.includes('bold') ? 'bold' : 'normal',
        fontStyle: textStyle.includes('italic') ? 'italic' : 'normal',
        minHeight: '300px',
    };

    const isSaveDisabled = content.trim().length < 300; // disable until 300+ chars

    return (
        <Card className=" shadow-none" hoverable={false}>
            <h2 className="text-gey-500 font-semibold mb-1">{title}</h2>
            <p className="text-grey-300 text-xs mb-5">{subtitle}</p>

            {/* Toolbar */}
            <Card hoverable={false} animated={false} className="flex flex-wrap w-full max-w-4xl items-center gap-2 mb-4 shadow-none rounded-2xl h-auto border border-grey-50 p-4">
                <Select className='w-30' value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Times New Roman">Times New Roman</option>
                </Select>

                <Select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                    {[12, 14, 16, 18, 20, 22, 24].map((s) => (
                        <option key={s} value={s.toString()}>
                            {s}px
                        </option>
                    ))}
                </Select>

                <ToggleGroup type="single" value={textAlign} onValueChange={(v) => setTextAlign(v as any)}>
                    <ToggleButton value="left" isSelected={textAlign === 'left'} onClick={() => { }}>
                        <AlignLeft className="h-3 w-3" />
                    </ToggleButton>
                    <ToggleButton value="center" isSelected={textAlign === 'center'} onClick={() => { }}>
                        <AlignCenter className="h-3 w-3" />
                    </ToggleButton>
                    <ToggleButton value="right" isSelected={textAlign === 'right'} onClick={() => { }}>
                        <AlignRight className="h-3 w-3" />
                    </ToggleButton>
                </ToggleGroup>

                <ToggleGroup type="multiple" value={textStyle} onValueChange={(v) => setTextStyle(v as string[])}>
                    <ToggleButton value="bold" isSelected={textStyle.includes('bold')} onClick={() => { }}>
                        <Bold className="h-3 w-3" />
                    </ToggleButton>
                    <ToggleButton value="italic" isSelected={textStyle.includes('italic')} onClick={() => { }}>
                        <Italic className="h-3 w-3" />
                    </ToggleButton>
                    <ToggleButton value="underline" isSelected={textStyle.includes('underline')} onClick={() => { }}>
                        <Underline className="h-3 w-3" />
                    </ToggleButton>
                </ToggleGroup>

                <div className="flex items-center  border border-gray-300 px-2 py-1 rounded-md bg-white">


                    {/* Color Input */}
                    <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="h-7 w-6 rounded-xl border border-grey-50 cursor-pointer appearance-none"
                    />

                    {/* HEX Code Display */}
                    <span className="text-sm font-mono text-grey-500">{textColor.toUpperCase()}</span>
                </div>

            </Card>

            {/* Editor */}
            <Card hoverable={false} animated={false} className="w-full shadow-none p-4">
                <div
                    ref={editorRef}
                    contentEditable
                    className="w-full border-none rounded-lg p-4 resize-y focus:outline-none"
                    onInput={(e) => setContent((e.target as HTMLElement).innerHTML)}
                    style={editorStyle}
                    suppressContentEditableWarning
                />

                {/* Save Button */}

            </Card>
            <div className="flex justify-between mt-6">
                <Button onClick={onCancel} variant='outline' className='border-grey-100 text-grey-500' iconPosition='left' icon={<X className="h-4 w-4 " />}>
                    Cancel
                </Button>
                <Button iconPosition='left' icon={<Check className="h-4 w-4" />} onClick={handleSave} disabled={isSaveDisabled}>

                    {saveButtonText}
                </Button>
            </div>
        </Card>
    );
};

export default RichTextEditor;
