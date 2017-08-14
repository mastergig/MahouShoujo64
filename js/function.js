//redimensiona o frame
function resizeIframe(valor)
{
	frame.width  = valor;
	frame.height = valor;
	frame.style.MozTransform  = "scale("+(valor/64)+")";
	frame.style.OTransform  = "scale("+(valor/64)+")";
	frame.style.webkitTransform  = "scale("+(valor/64)+")";
	frame.style.msZoom = (valor/64);
	container.style.width  = valor+"px";
	container.style.height = valor+"px";
	//container.style.maxWidth  = valor+"px";
	//container.style.maxHeight = valor+"px";
}