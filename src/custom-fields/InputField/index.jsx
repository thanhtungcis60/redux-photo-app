import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

InputField.propTypes = {
    field: PropTypes.object.isRequired,//fomik sẽ tự truyền vào
    form: PropTypes.object.isRequired,//fomik sẽ tự truyền vào

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
};

function InputField({ field, form,
    type, label, placeholder, disabled, hidden }) {
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <Input id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
                invalid={showError}
                hidden={hidden} />
            {/* {showError && <FormFeedback>{errors[name]}</FormFeedback>} */}
            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    );
}

export default InputField;