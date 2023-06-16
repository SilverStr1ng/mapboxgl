const localStorageUtil = () => {
    /**
     * 存储键值对到 localStorage
     * @param key - 键
     * @param value - 值
     */
    const setLocalValue = (key: string, value: any): void => {
        if (typeof localStorage === 'undefined') {
            console.error('本地存储 localStorage 未定义，请检查浏览器是否支持 localStorage.');
            return;
        }

        // 如果 value 是映射或集合，则转换为数组
        if (value instanceof Map || value instanceof Set) {
            value = Array.from(value);
        }

        // 如果 value 是正则表达式，则转换为字符串
        if (value instanceof RegExp) {
            value = value.toString();
        }

        try {
            const type = typeof value;
            
            // 如果 value 是数组或对象，则转换为 JSON 字符串
            if (Array.isArray(value) || type === 'object') {
                value = JSON.stringify(value);
            }

            localStorage.setItem(key, value);
        } catch (error) {
            console.error('进行本地存储时发生了错误:', error);
        }
    };

    /**
     * 从 localStorage 获取指定键的值
     * @param key - 键
     * @returns 值，如果键不存在则返回 undefined
     */
    const getLocalValue = <T>(key: string): T | undefined => {
        if (!localStorage.hasOwnProperty(key)) {
            console.error(`localStorage 中不存在键为 ${key} 的值.`);
            return undefined;
        }

        const value: string | null = localStorage.getItem(key);

        try {
            const parsedValue: T = JSON.parse(value as string);

            if (Array.isArray(parsedValue)) {
                if (parsedValue.length > 0 && Array.isArray(parsedValue[0])) {
                    return new Map(parsedValue) as unknown as T;
                } else {
                    return new Set(parsedValue) as unknown as T;
                }
            }

            return parsedValue;
        } catch (error) {
            return value as unknown as T;
        }
    };

    /**
     * 获取 localStorage 中所有的值
     * @param getKey - 是否返回键值对的键
     * @returns 所有值的数组，如果 getKey 为 true，则返回键值对的数组
     */
    const getAllLocalValues = <T>(getKey = false): Array<T | { key: string; value: T }> => {
        const values: Array<T | { key: string; value: T }> = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key: string = localStorage.key(i) as string;
            const value: T | undefined = getLocalValue<T>(key);

            if (getKey) {
                values.push({ key, value: value as T });
            } else {
                values.push(value as T);
            }
        }

        return values;
    };

    /**
     * 从 localStorage 删除指定键的值
     * @param key - 键
     */
    const removeLocalValue = (key: string): void => {
        if (!localStorage.hasOwnProperty(key)) {
            console.error(`localStorage 中不存在键为 ${key} 的值.`);
            return;
        }

        localStorage.removeItem(key);
    };

    /**
     * 清空 localStorage
     */
    const clearLocalValue = (): void => {
        localStorage.clear();
    };

    return {
        setLocalValue,
        getLocalValue,
        getAllLocalValues,
        removeLocalValue,
        clearLocalValue,
    };
};

export default localStorageUtil;
