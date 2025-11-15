// إصلاح النصوص العربية
const fixes = {
    "اسحيني": "اسحبني",
    "اسميني": "اسحبني", 
    "استجنبي": "اسحبني",
    "المققود": "المفقود",
    "المثقود": "المفقود",
    "محظم": "محطم"
};

// تطبيق الإصلاحات
document.addEventListener('DOMContentLoaded', function() {
    // استبدال النصوص في الصفحة
    document.body.innerHTML = document.body.innerHTML.replace(
        /اسحيني|اسميني|استجنبي|المققود|المثقود|محظم/g, 
        match => fixes[match]
    );
});
