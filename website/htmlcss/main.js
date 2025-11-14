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

	// Map (Leaflet)
	window.addEventListener('DOMContentLoaded',()=>{
		const el=document.getElementById('map');
		if(!el || typeof L==='undefined') return;
		const map=L.map('map',{scrollWheelZoom:false}).setView([45.4642,9.19],11);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
			attribution:'&copy; OpenStreetMap'
		}).addTo(map);
		const cities=[
			{n:'Milano',c:[45.4642,9.19]},
			{n:'Sesto San Giovanni',c:[45.534,9.234]},
			{n:'Cinisello Balsamo',c:[45.559,9.214]},
			{n:'Rho',c:[45.523,9.042]},
			{n:'Rozzano',c:[45.386,9.158]},
			{n:'Monza',c:[45.584,9.274]}
		];
		cities.forEach(x=>L.marker(x.c).addTo(map).bindPopup(x.n));
		// service area circle around Milano
		L.circle([45.4642,9.19],{radius:15000,color:'#ef4444',fillColor:'#ef4444',fillOpacity:0.08}).addTo(map);
	});