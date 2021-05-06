const translation =
    {
        "key": "The current date is {{date, MM/DD/YYYY}}",
        "key2": "{{text, uppercase}} just uppercased"

    }

i18next.init({
    interpolation: {
        format: function(value, format, lng) {
            if (format === 'uppercase') return value.toUpperCase();
            if(value instanceof Date) return moment(value).format(format);
            return value;
        }
    }
});
