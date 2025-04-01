const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.visitCount) {
        req.session.visitCount = 0;
    }
    let cookieVisitCount = parseInt(req.cookies.visitCount) || 0;

    req.session.visitCount++;
    cookieVisitCount++;
    res.cookie('visitCount', cookieVisitCount, {
        maxAge: 86400000,
        httpOnly: true
    });

    const customHeader = {
        'X-Visit-Count': req.session.visitCount,
        'Custom-Header-1': 'custom header value 1',
        'Custom-Header-2': 'custom header value 2'
    };
    res.set(customHeader);

    const response = {
        sessionVisitCount: req.session.visitCount,
        cookieVisitCount: cookieVisitCount,
        headers: customHeader
    };
    res.json(response);
});

module.exports = router;