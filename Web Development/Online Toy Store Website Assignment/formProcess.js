window.addEventListener('load', function() {
	const form = document.getElementById("orderForm");
	form.termsChkbx.addEventListener("click", terms);
	document.querySelector("input[name='submit']").addEventListener("click",submit);
	
	const homeShipping = document.querySelector('input[data-price][type=radio]');
	const shippingCost=parseFloat(homeShipping.dataset.price);
	
	form.total.value = shippingCost;
	
	let collections = document.querySelectorAll("input[name='deliveryType']");
	for(let x=0;x<collections.length;x++)
	{
		let collection = collections[x];
		collection.addEventListener("change",function(){addDelivery(collections)});
	}
	
	let items = document.querySelectorAll(".chosen");
	for(let x=0;x<items.length;x++)
	{	
		let item=items[x];
		item.addEventListener("change",function(){calculateTotal(x)});
	}
	
	function terms()
	{
		if (form.termsChkbx.checked)
		{
			document.getElementById("termsText").style.color = "black";
			document.getElementById("termsText").style.fontWeight = "normal";
			
			form.submit.disabled = false;
		}
		else
		{
			document.getElementById("termsText").style.color = "red";
			document.getElementById("termsText").style.fontWeight = "bold";
			form.submit.disabled = true;
		}
	}
	
	function submit(event)
	{		
		if((form.total.value - shippingCost) <= 0.00)
		{
			event.preventDefault();
			alert("Please select a toy");
			
		}
		else if(document.querySelector("input[name='forename']").value.trim() == "" || document.querySelector("input[name='surname']").value.trim() == "")
		{
			event.preventDefault();
			alert("Please fill in all details before proceeding");
		}
	}
	
	function addDelivery(collections)
	{
		let priorTotal = parseFloat(form.total.value);
		if(collections[0].checked)
		{
			let newTotal = priorTotal+=parseFloat(shippingCost);
			form.total.value=newTotal.toFixed(2);
		}
		else
		{
			let newTotal = priorTotal-=parseFloat(shippingCost);
			form.total.value=newTotal.toFixed(2);
		}
	}
	
	function calculateTotal(x)
	{
		let toyList = form.querySelectorAll("div.item");
		let toy = toyList[x];
		let priorTotal = parseFloat(form.total.value);
		let val = 0;
		
		const checkbox = toy.querySelector('input[data-price][type=checkbox]');
		let cost=parseFloat(checkbox.dataset.price);
		
		if(checkbox.checked)
		{
			let newTotal = priorTotal + cost;
			val=parseFloat(newTotal);
		}
		else
		{
			let newTotal = priorTotal - cost;
			val=parseFloat(newTotal);
		}
		
		form.total.value = val.toFixed(2);
		return form.total.value;
	}
});