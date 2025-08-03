console.log('reportControllerNEW.js minimal test loaded');
module.exports = {
  createReport: (req, res) => res.send('Report minimal test'),
  getAllReports: (req, res) => res.send('Report minimal test'),
  getReportById: (req, res) => res.send('Report minimal test'),
  updateReport: (req, res) => res.send('Report minimal test'),
  deleteReport: (req, res) => res.send('Report minimal test')
};
