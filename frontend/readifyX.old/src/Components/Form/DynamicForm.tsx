import React, { useState, ChangeEvent, FormEvent } from 'react';

interface DynamicFormProps<T> {
    initialValues: T;
    onSubmit: (values: T) => void;
}

function DynamicForm<T extends object>({ initialValues, onSubmit }: DynamicFormProps<T>) {
    const [formValues, setFormValues] = useState<T>(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;

    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;  // Type narrowing
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: checked,
        }));
    } else {
        const { value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }
};


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    const renderInputField = (key: string, value: any) => {
        if (typeof value === 'string') {
            if (value.match(/^\d{4}-\d{2}-\d{2}$/)) { // Basic check for date string (YYYY-MM-DD)
                return (
                    <input
                        id={key}
                        name={key}
                        type="date"
                        value={value}
                        onChange={handleChange}
                    />
                );
            }
            return (
                <input
                    id={key}
                    name={key}
                    type="text"
                    value={value}
                    onChange={handleChange}
                />
            );
        } else if (typeof value === 'number') {
            return (
                <input
                    id={key}
                    name={key}
                    type="number"
                    value={value}
                    onChange={handleChange}
                />
            );
        } else if (Array.isArray(value)) {
            return (
                <select
                    id={key}
                    name={key}
                    multiple
                    value={value}
                    onChange={handleChange}
                >
                    {value.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        } else if (typeof value === 'boolean') {
            return (
                <input
                    id={key}
                    name={key}
                    type="checkbox"
                    checked={value}
                    onChange={handleChange}
                />
            );
        }
        return null;
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.entries(formValues).map(([key, value]) => (
                <div key={key}>
                    <label htmlFor={key}>{key}</label>
                    {renderInputField(key, value)}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}

export default DynamicForm;
