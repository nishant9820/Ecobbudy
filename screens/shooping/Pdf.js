import dateFormat, { masks } from "dateformat";

function GetTime(date) {
  var hours = parseInt(dateFormat(date, "hh"));
  var minutes = parseInt(dateFormat(date, "MM"));
  var ampm = hours >= 12 ? "AM" : "PM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const PdfCode = (productName, userName, total) => `
<html>
	<head>
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
	</head>
	<body>
		<div
			style="
				min-height: auto;
				width: 100%;
				height: 97vh;
				border: solid 2px #000;
			">
			<div
				style="
					height: auto;
					width: 100%;
					display: flex;
					flex-direction: row;
					/* padding: 20px; */
					justify-content: space-between;
					align-items: center;
				">
				<div class="data-title">
					<div
						style="
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							font-size: 2rem;
							padding-left: 20px;
						">
						Ecobuddy<br />
					</div>
					<div
						style="
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							padding-left: 20px;
						">
						Let's go green
					</div>
				</div>

				<img
					style="height: 120px; width: 170px; margin-right: 15px"
					src="https://firebasestorage.googleapis.com/v0/b/ecobuddy-ae54d.appspot.com/o/earth.png?alt=media&token=759a7618-ae55-4693-b0e6-4412a7257c5e" />
			</div>
			<hr />
			<hr />

			<div
				style="
					width: 100%;
					height: auto;
					padding: 15px;
					display: flex;
					flex-direction: row;
					justify-content: space-evenly;
				">
				<div style="width: 50%; align-items: flex-start">
					<p class="invoice-user">
						Bill To : <br />
						Name : ${userName} <br />
					</p>
				</div>
				<div style="align-items: flex-end">
					<p>
						Invoice No : <br />
						Date : ${dateFormat(Date.now(), "dd-mm-yyyy")}<br />
						Time :${GetTime(new Date())}<br/>
						Bill Status : 
					</p>
				</div>
			</div>
			<hr />
			<hr />
			<div
				style="
					height: auto;
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
				">
				<table style="width: 100%; border-collapse: collapse">
					<tr style="background-color: #064F60; color: white">
						<th style="height: 30px">Index</th>
						<th style="height: 30px">Product Name</th>
						<th style="height: 30px">Total</th>
					</tr>
					<tr style="background-color: rgba(246, 221, 178, 0.8)">
						<td style="text-align: center; height: 30px">1</td>
						<td style="text-align: center; height: 30px">${productName}</td>
						<td style="text-align: center; height: 30px">₹ ${total}</td>
					</tr>
				</table>
				<div
					style="
						width: 100%;
						align-self: flex-end;
						display: flex;
						flex-direction: row;
					">
					<div style="width: 40%"></div>
					<table style="width: 50%; align-self: flex-end">
						<tr>
							<th style="text-align: start">Grand Total :</th>
							<td style="text-align: center; height: 30px">₹ ${total}</td>
						</tr>
						<tr>
							<th style="text-align: start">Bill Status :</th>
							<td style="text-align: center; height: 30px"> </td>
						</tr>
						<tr>
							<th style="text-align: start">Payment Method:</th>
							<td style="text-align: center; height: 30px">Online</td>
						</tr>
						
					</table>
				</div>
			</div>
			<hr />
			<hr />
		</div>
	</body>
</html>
`;

const style = `
    .container {
      margin : 15px;
      border : solid 2px #000
    }
`;

export { PdfCode };
