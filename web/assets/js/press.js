export function initPress(url) {
    if (!url) {
        return;
    }

    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
        var viewer = document.getElementById('pdf-viewer');

        for (var pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(function(page) {
                var viewport = page.getViewport({ scale: 3 });
                var canvas = document.createElement('canvas');
                viewer.appendChild(canvas);
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        }
    }).catch(function(error) {
        console.error("Error loading PDF:", error);
    });
}
