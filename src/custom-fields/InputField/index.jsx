import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

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
    type, label, placeholder, disabled }) {
    const { name, value, onChange, onBlur } = field;
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
                disabled={disabled} />
        </FormGroup>
    );
}

export default InputField;