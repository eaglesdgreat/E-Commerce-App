// import serialize from 'serialize-javascript'

export default ({ markup, css }) => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Online Mall</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,800,900&display=swap">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <style>a{text-decoration: none}</style>
            <style id="jss-server-side">${css}</style>
        </head>
        <body style="margin:0">
            <div id="root">${markup}</div>
            <script src="./dist/bundle.js" type="text/javascript"></script>
        </body>
    </html>`
}
