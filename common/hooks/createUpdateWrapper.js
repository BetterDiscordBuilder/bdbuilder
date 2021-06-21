const createUpdateWrapper = (Component, valueProp = "value", changeProp = "onChange", valueIndex = 0) => props => {
    const [value, setValue] = React.useState(props[valueProp]);

    return <Component
        {...{
            ...props,
            [valueProp]: value,
            [changeProp]: (...args) => {
                const value = args[valueIndex];
                if (typeof props[changeProp] === "function") props[changeProp](value);
                setValue(value);
            }
        }}
    />;
};

export default createUpdateWrapper;