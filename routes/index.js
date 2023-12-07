var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer()
let country = require('../public/data/country.json');
const db = require('../models');

/* GET home page. */
router.get('/', function (req, res, next) {
  //排序 國家名稱
  const sortedCountries = country.sort((a, b) => {
    return a.name.common.localeCompare(b.name.common);
  });

  res.render('index', { country: sortedCountries });
});

router.post('/apply', async (req, res, next) => {
  const i18n = req.app.locals.i18n;

  if (req.body.FirstName.trim() === '') {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgFirstNameEmpty'), field: 'FirstName' }));
    return;
  }

  if (req.body.LastName.trim() === '') {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgLastNameEmpty'), field: 'LastName' }));
    return;
  }

  if (req.body.Birthday.trim() === '' || isNaN(Date.parse(req.body.Birthday.trim()))) {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgBirthdayEmpty'), field: 'Birthday' }));
    return;
  }

  if (req.body.Gender === undefined) {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgGenderEmpty') }));
    return;
  }

  if (req.body.Country.trim() === '') {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgCountryEmpty'), field: 'Country' }));
    return;
  }

  if (req.body.Nationality.trim() === '') {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgNationalityEmpty') }));
    return;
  }

  if (req.body.Language.trim() === '') {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgLanguageEmpty'), field: 'Language' }));
    return;
  }

  if (req.body.Qualification.trim() === '') {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgQualificationEmpty'), field: 'Qualification' }));
    return;
  }

  if (req.body.Institution.trim() === '') {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgInstitutionEmpty'), field: 'Institution' }));
    return;
  }

  if (req.body.YearCompleted.trim() === '' || isNaN(Date.parse(req.body.YearCompleted.trim()))) {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgYearCompletedEmpty'), field: 'YearCompleted' }));
    return;
  }

  if (req.body.QualificationCountry.trim() === '') {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgQualificationCountryEmpty'), field: 'QualificationCountry' }));
    return;
  }

  if (req.body.Address.trim() === '') {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgAddressEmpty'), field: 'Address' }));
    return;
  }

  // 使用正則表達式進行判斷
  const PhoneRegex = /^(\+?[\d\s-]+)$/;
  if (req.body.Phone.trim() === '' || !PhoneRegex.test(req.body.Phone.trim())) {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgPhoneEmpty') }));
    return;
  }

  // 使用正則表達式進行判斷
  const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (req.body.Email.trim() === '' || !EmailRegex.test(req.body.Email.trim())) {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgEmailEmpty') }));
    return;
  }

  if (req.body.PhysicalConditionCheck.trim() === undefined) {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgPhysicalConditionCheckEmpty') }));
    return;
  }

  if (req.body.PhysicalConditionCheck.trim() === '1') {
    if (req.body['PhysicalCondition[]'] === undefined) {
      res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgPhysicalConditionEmpty') }));
      return;
    }

    if (req.body['PhysicalCondition[]'].length === 0) {
      res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgPhysicalConditionEmpty') }));
      return;
    }

    if (req.body['PhysicalCondition[]'][req.body['PhysicalCondition[]'].length - 1] === "Other") {
      if (req.body.PhysicalConditionOther.trim() === '') {
        res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgPhysicalConditionOtherEmpty'), field: 'PhysicalConditionOther' }));
        return;
      }
    }
  }

  if (req.body['MessageSource[]'] === undefined) {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgMessageSourceEmpty') }));
    return;
  }

  if (req.body['MessageSource[]'].length === 0) {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgMessageSourceEmpty') }));
    return;
  }

  /*
  if (req.Comment.trim() === '') {
    res.status(200).send(JSON.stringify({ error: true, msg: i18n('msgCommentEmpty'), field: 'Comment' }));
    return;
  }
  */



  const created = await db.Member.create({
    FirstName: req.body.FirstName.trim(),
    LastName: req.body.LastName.trim(),
    Birthday: req.body.Birthday.trim(),
    Gender: req.body.Gender.trim(),
    Country: req.body.Country.trim(),
    Nationality: req.body.Nationality.trim(),
    Language: req.body.Language.trim(),
    Qualification: req.body.Qualification.trim(),
    Institution: req.body.Institution.trim(),
    YearCompleted: req.body.YearCompleted.trim(),
    QualificationCountry: req.body.QualificationCountry.trim(),
    Address: req.body.Address.trim(),
    City: req.body.City.trim(),
    State: req.body.State.trim(),
    ZipCode: req.body.ZipCode.trim(),
    Phone: req.body.Phone.trim(),
    Email: req.body.Email.trim(),
    PhysicalConditionCheck: req.body.PhysicalConditionCheck.trim(),
    PhysicalCondition: (req.body['PhysicalCondition[]']).join(','),
    PhysicalConditionOther: req.body.PhysicalConditionOther.trim(),
    MessageSource: (req.body['MessageSource[]']).join(','),
    Comment: req.body.Comment.trim()
  })

  res.status(200).send(JSON.stringify({ error: false, msg: created ? i18n('msgSuccess') : i18n('msgFail') }));
});


module.exports = router;
