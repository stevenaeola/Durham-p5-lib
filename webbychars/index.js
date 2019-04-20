let wc = null;

function setup () {
	wc = new WebbyChars(false, windowWidth, 500, "canvas-container", 0);
}

function draw () {
	wc.draw();
}

function windowResize () {
	resizeCanvas(windowWidth, 500);
}

window.addEventListener("load", function () {
	document.getElementById("new").addEventListener("click", function () {
		let wt = document.createElement("div");

		wt.innerHTML = "<p>Text</p><input type=\"text\" class=\"wt-text\" placeholder=\"Text\" value=\"Test\"><br />" +
						"<p>x</p><input type=\"number\" class=\"wt-x\" placeholder=\"x\" step=\"1\" min=\"0\" value=\"0\"><br />" +
						"<p>y</p><input type=\"number\" class=\"wt-y\" placeholder=\"y\" step=\"1\" min=\"0\" value=\"100\"><br />" +
						"<p>Max number of vertices</p><input type=\"number\" class=\"wt-vertices\" placeholder=\"Number of vertices\" value=\"1000\"><br />" +
						"<p>Font name</p><input type=\"text\" class=\"wt-fontName\" placeholder=\"Font name\" value=\"Helvetica\"><br />" +
						"<p>Font size</p><input type=\"number\" class=\"wt-fontSize\" placeholder=\"Font size\" step=\"1\" min=\"1\" value=\"300\"><br />" +
						"<p>Min Vertex Movement Radius</p><input type=\"number\" class=\"wt-minVertexMovementRadius\" placeholder=\"Min Vertex Movement Radius\" step=\"1\" min=\"0\" value=\"5\"><br />" +
						"<p>Max Vertex Movement Radius</p><input type=\"number\" class=\"wt-maxVertexMovementRadius\" placeholder=\"Max Vertex Movement Radius\" step=\"1\" min=\"0\" value=\"10\"><br />" +
						"<p>Vertex Radius</p><input type=\"number\" class=\"wt-vertexRadius\" placeholder=\"Vertex Radius\" step=\"1\" min=\"0\" value=\"5\"><br />" +
						"<p>Max Vertex Connectable Distance</p><input type=\"number\" class=\"wt-maxVertexConnectableDistance\" placeholder=\"Max Vertex Connectable Distance\" step=\"1\" min=\"0\" value=\"20\"><br />" +
						"<p>Vertex Movement Speed</p><input type=\"number\" class=\"wt-vertexMovementSpeed\" placeholder=\"Vertex Movement Speed\" step=\"0.01\" min=\"0\" value=\"0.05\"><br />" +
						"<p>Use global vertex colors</p><input type=\"checkbox\" class=\"wt-globalVertexColor\"><br />" +
						"<p>Use global line colors</p><input type=\"checkbox\" class=\"wt-globalLineColor\"><br />" +
						"<p>Vertex Color 1 (mode dependent)</p><input type=\"color\" class=\"wt-vertexColor1\" value=\"#ff0000\"><br />" +
						"<p>Vertex Color 2 (mode dependent)</p><input type=\"color\" class=\"wt-vertexColor2\" value=\"#0000ff\"><br />" +
						"<p>Line Color 1 (mode dependent)</p><input type=\"color\" class=\"wt-lineColor1\" value=\"#ff0000\"><br />" +
						"<p>Line Color 2 (mode dependent)</p><input type=\"color\" class=\"wt-lineColor2\" value=\"#0000ff\"><br />" +
						"<p>Vertex Color Mode</p><select class=\"wt-vertexColorMode\"><option value=\"FIXED\">Fixed</option><option value=\"RANDOM_FIXED\">Random Fixed</option><option value=\"RANDOM_DYNAMIC\" selected>Random Dynamic</option><option value=\"TWINKLE\">Twinkle</option></select><br />" +
						"<p>Use delta smoothing on vertex colors</p><input type=\"checkbox\" class=\"wt-vertexDeltaSmoothed\" checked><br />" +
						"<p>Line Color Mode</p><select class=\"wt-lineColorMode\"><option value=\"FIXED\">Fixed</option><option value=\"RANDOM_FIXED\">Random Fixed</option><option value=\"RANDOM_DYNAMIC\" selected>Random Dynamic</option><option value=\"TWINKLE\">Twinkle</option></select><br />" +
						"<p>Use delta smoothing on line colors</p><input type=\"checkbox\" class=\"wt-lineDeltaSmoothed\" checked><br />" +
						"<p>Vertex color max time</p><input type=\"number\" class=\"wt-vertexMaxTime\" placeholder=\"Vertex Color Max Time\" step=\"1\" min=\"0\" value=\"1000\"><br />" +
						"<p>Line color max time</p><input type=\"number\" class=\"wt-lineMaxTime\" placeholder=\"Line Color Max Time\" step=\"1\" min=\"0\" value=\"1000\"><br /><br />" +
						"<button type=\"submit\" class=\"delete\">Delete</button>";
		wt.classList.add("wt");
		document.getElementById("settings-container").appendChild(wt);
		wt.getElementsByClassName("delete")[0].addEventListener("click", function (e) {
			e.target.closest("div.wt").remove();
		});
	});
	document.getElementById("save").addEventListener("click", function () {
		let existingWts = wc.getWebbedTexts();

		for (let i = 0; i < existingWts.length; i++) {
			wc.remove(existingWts[i]);
		}
		let wts = document.getElementsByClassName("wt");

		//Helper functions defined only in this event handler's scope to repeat less code.
		function gcn (w, c, p) {
			let val = w.getElementsByClassName("wt-" + c)[0].value;

			if (p === "i") {
				return parseInt(val);
			}
			else if (p === "f") {
				return parseFloat(val);
			}
			return val;
		}

		function gm (m) {
			return WebbedTextColorType[m];
		}

		function h2r (hex) {
			let r = parseInt(hex.slice(1, 3), 16);


			let g = parseInt(hex.slice(3, 5), 16);


			let b = parseInt(hex.slice(5, 7), 16);

			return {r, g, b};
		}
		
		for (let i = 0; i < wts.length; i++) {
			let w = wts[i];
			let vc1 = h2r(gcn(w, "vertexColor1"));
			let vc2 = h2r(gcn(w, "vertexColor2"));
			let lc1 = h2r(gcn(w, "lineColor1"));
			let lc2 = h2r(gcn(w, "lineColor2"));
			let t = new WebbedText(gcn(w, "text"), gcn(w, "x", "i"), gcn(w, "y", "i"), gcn(w, "vertices", "i"), gcn(w, "fontName"), gcn(w, "fontSize", "i"), {
				"minVertexMovementRadius": gcn(w, "minVertexMovementRadius", "i"),
				"maxVertexMovementRadius": gcn(w, "maxVertexMovementRadius", "i"),
				"vertexRadius": gcn(w, "vertexRadius", "i"),
				"maxVertexConnectableDistance": gcn(w, "maxVertexConnectableDistance", "i"),
				"vertexMovementSpeed": gcn(w, "vertexMovementSpeed", "f"),
				"vertexColor": new WebbedTextColor(gm(gcn(w, "vertexColorMode")) | (w.getElementsByClassName("wt-vertexDeltaSmoothed")[0].checked ? WebbedTextColorType.DELTA_SMOOTHED : 0), color(vc1.r, vc1.g, vc1.b), color(vc2.r, vc2.g, vc2.b), gcn(w, "vertexMaxTime")),
				"lineColor": new WebbedTextColor(gm(gcn(w, "lineColorMode")) | (w.getElementsByClassName("wt-lineDeltaSmoothed")[0].checked ? WebbedTextColorType.DELTA_SMOOTHED : 0), color(lc1.r, lc1.g, lc1.b), color(lc2.r, lc2.g, lc2.b), gcn(w, "lineMaxTime")),
				"globalVertexColor": w.getElementsByClassName("wt-globalVertexColor")[0].checked,
				"globalLineColor": w.getElementsByClassName("wt-globalLineColor")[0].checked
			});

			wc.add(t);
		}
	});
});
