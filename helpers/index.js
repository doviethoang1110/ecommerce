const {CategoryService, CurrencyService} = require('../container');

module.exports.singleton = (function () {
    let globalCategories;
    let globalCurrencies;
    let check = false;
    return async function(){
        if(!check) {
            check = true;
            let [value1, value2] = await Promise.all([CurrencyService.getAllCurrencies(), CategoryService.printMenusWeb()]);
            globalCurrencies = value1;
            globalCategories = value2;
            return {globalCurrencies,globalCategories};
        }
    }
})();

generateSlug = (name) => {
    let slug;
    slug = name.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
}
fixName = (name) => {
    let res = name.toLowerCase();
    res = name.charAt(0).toUpperCase()+name.slice(1,name.length);
    return res;
}

module.exports.hookModel = (attributes) => {
    if(attributes.name) {
        attributes.name = fixName(attributes.getDataValue('name'));
        attributes.slug = generateSlug(attributes.getDataValue('name'));
    }else {
        attributes.title = fixName(attributes.getDataValue('title'));
        attributes.slug = generateSlug(attributes.getDataValue('title'));
    }
}