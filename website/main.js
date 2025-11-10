// Mobile menu toggle
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
if(hamburger){
	hamburger.addEventListener('click',()=>{
		const open = mobileMenu.classList.toggle('open');
		hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
		if(mobileMenu){
			mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
		}
	});
}

// Image fallback: if local image missing, replace with data-fallback URL
document.querySelectorAll('img[data-fallback]').forEach(img=>{
	const swap=()=>{
		if(img.dataset.fallback && img.src!==img.dataset.fallback){
			img.src=img.dataset.fallback;
		}
	};
	img.addEventListener('error',swap);
	// In case the image silently fails (0 natural width after load)
	img.addEventListener('load',()=>{
		if(img.naturalWidth===0){swap();}
	});
	// If already loaded and broken
	if(img.complete && img.naturalWidth===0){swap();}
});