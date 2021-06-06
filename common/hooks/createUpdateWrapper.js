const createUpdateWrapper = (Component, valueProp = "value", changeProp = "onChange") => props => {
    const [value, setValue] = React.useState(props[valueProp]);

    return <Component 
        {...{
            ...props,
            [valueProp]: value,
            [changeProp]: value => {
                if (typeof props[changeProp] === "function") props[changeProp](value);
                setValue(value);
            }
        }}
    />;
};

export default createUpdateWrapper;