// 设置货币符号映射
const currencySymbols = {
    'USD': '$',
    'HKD': 'HK$',
    'CNH': '¥'
};

// 保险公司名称映射
const companyNames = {
    'AXA': '安盛',
    'Chubb': '安达',
    'Prudential': '保诚',
    'ChinaLife': '国寿',
    'FWD': '富卫',
    'Manulife': '宏利',
    'HSBC': '汇丰',
    'CPIC': '太保',
    'TaiPing': '太平',
    'MassMutual': '万通',
    'AIA': '友邦',
    'SunLife': '永明',
    'CTF': '周大福',
    'BOC': '中银',
    'Generali': '忠意'
};

// 千分位格式化函数
function formatNumber(input) {
    // 获取输入值并移除所有非数字字符(保留小数点)
    let value = input.value.replace(/[^\d.]/g, '');
    
    // 处理金额格式
    if (value) {
        // 分割整数和小数部分
        let parts = value.split('.');
        let integerPart = parts[0];
        let decimalPart = parts.length > 1 ? '.' + parts[1] : '';
        
        // 添加千分位分隔符到整数部分
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        // 更新输入框的值
        input.value = integerPart + decimalPart;
    }
}

// 从格式化的数字字符串中获取原始数值
function parseFormattedNumber(formattedString) {
    if (!formattedString) return 0;
    return parseFloat(formattedString.replace(/,/g, ''));
}

// 更新货币符号
function updateCurrencySymbols() {
    const currency = document.getElementById('currency').value;
    const symbol = currencySymbols[currency];
    document.getElementById('currency-symbol1').textContent = symbol;
    document.getElementById('currency-symbol2').textContent = symbol;
}

function updateCurrencySymbols3() {
    const currency = document.getElementById('currency3').value;
    const symbol = currencySymbols[currency];
    document.getElementById('currency-symbol3').textContent = symbol;
}

// 更新多产品对比中的货币符号
function updateMultiCurrencySymbol(index) {
    const productForms = document.querySelectorAll('.product-form');
    const form = productForms[index];
    
    const currencySelect = form.querySelector('.multi-currency');
    const currencySymbols = form.querySelectorAll('.multi-currency-symbol');
    
    const symbol = currencySymbols[currencySelect.value];
    currencySymbols.forEach(el => {
        el.textContent = symbol;
    });
}

// 格式化货币显示
function formatCurrency(amount, currency) {
    const symbol = currencySymbols[currency];
    return symbol + amount.toLocaleString('en-US', {maximumFractionDigits: 0});
}

function switchTab(tabId) {
    // 隐藏所有tab内容
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 取消所有tab的active状态
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 显示选中的tab内容
    document.getElementById(tabId).classList.add('active');
    
    // 设置选中tab的active状态
    let tabIndex;
    if (tabId === 'tab1') tabIndex = 0;
    else if (tabId === 'tab2') tabIndex = 1;
    else tabIndex = 2;
    
    document.querySelectorAll('.tab')[tabIndex].classList.add('active');
    
    // 移动tab滑块
    const slider = document.querySelector('.tab-slider');
    slider.className = 'tab-slider';
    
    if (tabId === 'tab2') {
        slider.classList.add('tab2');
    } else if (tabId === 'tab3') {
        slider.classList.add('tab3');
    }
}

function togglePaymentType() {
    const paymentType = document.getElementById('paymentType').value;
    const premiumYearsContainer = document.getElementById('premiumYearsContainer');
    
    if (paymentType === 'multiple') {
        premiumYearsContainer.classList.add('show');
    } else {
        premiumYearsContainer.classList.remove('show');
    }
}

function togglePaymentType3() {
    const paymentType = document.getElementById('paymentType3').value;
    const premiumYearsContainer = document.getElementById('premiumYearsContainer3');
    
    if (paymentType === 'multiple') {
        premiumYearsContainer.classList.add('show');
    } else {
        premiumYearsContainer.classList.remove('show');
    }
}

function toggleMultiPaymentType(index) {
    const productForms = document.querySelectorAll('.product-form');
    const form = productForms[index];
    
    const paymentType = form.querySelector('.multi-payment-type').value;
    const premiumYearsContainer = form.querySelector('.multi-premium-years-container');
    
    if (paymentType === 'multiple') {
        premiumYearsContainer.style.display = 'block';
    } else {
        premiumYearsContainer.style.display = 'none';
    }
}

// 切换共同参数中的付款方式
function toggleMultiCommonPaymentType() {
    const paymentType = document.getElementById('multiPaymentType').value;
    const premiumYearsContainer = document.getElementById('multiCommonPremiumYearsContainer');
    
    if (paymentType === 'multiple') {
        premiumYearsContainer.style.display = 'block';
    } else {
        premiumYearsContainer.style.display = 'none';
    }
}

// 应用共同设置到所有产品
function applyCommonSettings() {
    const commonPremium = document.getElementById('multiCommonPremium').value;
    const commonPaymentType = document.getElementById('multiPaymentType').value;
    const commonPremiumYears = document.getElementById('multiCommonPremiumYears').value;
    
    // 遍历所有产品表单
    document.querySelectorAll('.product-form').forEach((form, index) => {
        // 如果设置了共同保费金额，则应用到当前产品
        if (commonPremium.trim() !== '') {
            form.querySelector('.multi-premium').value = commonPremium;
        }
        
        // 应用付款方式
        const paymentTypeSelect = form.querySelector('.multi-payment-type');
        paymentTypeSelect.value = commonPaymentType;
        
        // 切换付款方式相关字段
        toggleMultiPaymentType(index);
        
        // 如果是分期付款且设置了共同付款年限，则应用到当前产品
        if (commonPaymentType === 'multiple' && commonPremiumYears.trim() !== '') {
            form.querySelector('.multi-premium-years').value = commonPremiumYears;
        }
    });
    
    alert('共同设置已应用到所有产品！');
}

// 重置共同设置
function resetCommonSettings() {
    document.getElementById('multiCommonPremium').value = '';
    document.getElementById('multiPaymentType').value = 'single';
    document.getElementById('multiCommonPremiumYears').value = '';
    
    // 隐藏分期付款年限
    document.getElementById('multiCommonPremiumYearsContainer').style.display = 'none';
    
    alert('共同设置已重置！');
}

// 切换产品表单
function switchProductForm(index) {
    // 隐藏所有产品表单
    document.querySelectorAll('.product-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // 取消所有产品标签的active状态
    document.querySelectorAll('.product-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 显示选中的产品表单
    document.querySelectorAll('.product-form')[index].classList.add('active');
    
    // 设置选中产品标签的active状态
    document.querySelectorAll('.product-tab')[index].classList.add('active');
}

function calculateIRR(cashflows) {
    // 初始猜测值
    let guess = 0.1;
    const PRECISION = 0.0000001;
    const MAX_ITERATIONS = 100;
    
    for (let i = 0; i < MAX_ITERATIONS; i++) {
        let npv = 0;
        let derivativeNpv = 0;
        
        for (let j = 0; j < cashflows.length; j++) {
            npv += cashflows[j].amount / Math.pow(1 + guess, cashflows[j].year);
            derivativeNpv -= cashflows[j].year * cashflows[j].amount / Math.pow(1 + guess, cashflows[j].year + 1);
        }
        
        // 如果NPV接近0，则找到解
        if (Math.abs(npv) < PRECISION) {
            return guess;
        }
        
        // 牛顿法迭代
        let newGuess = guess - npv / derivativeNpv;
        
        if (Math.abs(newGuess - guess) < PRECISION) {
            return newGuess;
        }
        
        guess = newGuess;
    }
    
    // 如果没有收敛，返回NaN
    return NaN;
}

function calculateAPY(totalInvestment, finalAmount, years) {
    return (finalAmount / totalInvestment - 1) / years;
}

function getTotalInvestment(premium, paymentType, premiumYears) {
    if (paymentType === 'single') {
        return premium;
    } else {
        return premium * premiumYears;
    }
}

// 根据分红实现率调整退保金额
function adjustAmountByRate(baseAmount, rate) {
    // 假设分红部分占退保金额的40%（这是一个假设值，实际情况可能不同）
    const guaranteedPortion = 0.6; // 保证部分占比
    const dividendPortion = 0.4;   // 分红部分占比
    
    // 基础保证金额
    const guaranteedAmount = baseAmount * guaranteedPortion;
    // 分红金额按照实现率调整
    const dividendAmount = baseAmount * dividendPortion * (rate / 100);
    
    return guaranteedAmount + dividendAmount;
}

// 获取分红实现率的CSS类名
function getRateClass(rate) {
    if (rate === 105) return 'rate-105';
    if (rate === 100) return 'rate-100';
    if (rate === 95) return 'rate-95';
    if (rate === 85) return 'rate-85';
    if (rate === 75) return 'rate-75';
    return '';
}

// 计算不同分红实现率下的结果
function calculateMultipleRates() {
    const company = document.getElementById('company').value;
    const productName = document.getElementById('productName').value;
    const entryAge = parseInt(document.getElementById('entryAge').value);
    const surrenderYear = parseInt(document.getElementById('surrenderYear').value);
    const paymentType = document.getElementById('paymentType').value;
    const currency = document.getElementById('currency').value;
    const premium = parseFormattedNumber(document.getElementById('premium').value);
    const baseAmount = parseFormattedNumber(document.getElementById('surrenderAmount').value);
    
    let premiumYears = 1; // 默认趸交
    if (paymentType === 'multiple') {
        premiumYears = parseInt(document.getElementById('premiumYears').value);
        if (isNaN(premiumYears) || premiumYears < 1) {
            alert('请输入有效的交费年限！');
            return;
        }
    }
    
    if (!productName || isNaN(entryAge) || isNaN(surrenderYear) || isNaN(premium) || isNaN(baseAmount)) {
        alert('请填写所有必填字段！');
        return;
    }
    
    if (paymentType === 'multiple' && premiumYears > surrenderYear) {
        alert('交费年限不能大于保单持有年度！');
        return;
    }
    
    // 计算退保年龄
    const surrenderAge = entryAge + surrenderYear;
    
    // 计算总投资额
    const totalInvestment = getTotalInvestment(premium, paymentType, premiumYears);
    
    // 设置不同的分红实现率
    const rates = [105, 100, 95, 85, 75];
    const results = [];
    
    // 为每个分红实现率计算结果
    for (const rate of rates) {
        // 调整后的退保金额
        const adjustedAmount = rate === 100 ? baseAmount : adjustAmountByRate(baseAmount, rate);
        
        // 准备现金流数据
        let cashflows = [];
        
        // 添加保费支付（负现金流）
        if (paymentType === 'single') {
            // 一次性付款
            cashflows.push({ year: 0, amount: -premium });
        } else {
            // 分期付款，每年支付一次
            for (let i = 0; i < premiumYears; i++) {
                cashflows.push({ year: i, amount: -premium });
            }
        }
        
        // 添加退保金额（正现金流）
        cashflows.push({ year: surrenderYear, amount: adjustedAmount });
        
        // 计算IRR和APY
        const irr = calculateIRR(cashflows);
        const apy = calculateAPY(totalInvestment, adjustedAmount, surrenderYear);
        
        results.push({
            rate: rate,
            amount: adjustedAmount,
            irr: irr,
            apy: apy,
            rateClass: getRateClass(rate)
        });
    }
    
    // 显示结果
    document.getElementById('result-company').textContent = companyNames[company] || company;
    document.getElementById('result-product').textContent = productName;
    document.getElementById('result-age').textContent = entryAge;
    document.getElementById('surrender-age').textContent = surrenderAge;
    document.getElementById('holding-years').textContent = surrenderYear;
    document.getElementById('total-premium').textContent = formatCurrency(totalInvestment, currency);
    
    // 填充表格
    const tableBody = document.querySelector('#rates-table tbody');
    tableBody.innerHTML = '';
    
    results.forEach(result => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td class="${result.rateClass}">${result.rate}%</td>
            <td>${formatCurrency(result.amount, currency)}</td>
            <td class="${result.rateClass}">${(result.irr * 100).toFixed(2)}%</td>
            <td class="${result.rateClass}">${(result.apy * 100).toFixed(2)}%</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    document.getElementById('result1').style.display = 'block';
}

// 预测不同分红实现率下的退保金额
function predictSurrenderAmounts() {
    const company = document.getElementById('company3').value;
    const productName = document.getElementById('productName3').value;
    const entryAge = parseInt(document.getElementById('entryAge3').value);
    const surrenderYear = parseInt(document.getElementById('surrenderYear3').value);
    const paymentType = document.getElementById('paymentType3').value;
    const currency = document.getElementById('currency3').value;
    const premium = parseFormattedNumber(document.getElementById('premium3').value);
    const targetIRR = parseFloat(document.getElementById('knownIRR').value) / 100;
    
    let premiumYears = 1; // 默认趸交
    if (paymentType === 'multiple') {
        premiumYears = parseInt(document.getElementById('premiumYears3').value);
        if (isNaN(premiumYears) || premiumYears < 1) {
            alert('请输入有效的交费年限！');
            return;
        }
    }
    
    if (!productName || isNaN(entryAge) || isNaN(surrenderYear) || isNaN(premium) || isNaN(targetIRR)) {
        alert('请填写所有必填字段！');
        return;
    }
    
    if (paymentType === 'multiple' && premiumYears > surrenderYear) {
        alert('交费年限不能大于保单持有年度！');
        return;
    }
    
    // 计算退保年龄
    const surrenderAge = entryAge + surrenderYear;
    
    // 计算总投资额
    const totalInvestment = getTotalInvestment(premium, paymentType, premiumYears);
    
    // 计算目标退保金额（100%分红实现率）
    let targetAmount = 0;
    
    if (paymentType === 'single') {
        // 趸交的情况
        targetAmount = premium * Math.pow(1 + targetIRR, surrenderYear);
    } else {
        // 期交的情况，需要考虑每笔保费的复利
        for (let i = 0; i < premiumYears; i++) {
            targetAmount += premium * Math.pow(1 + targetIRR, surrenderYear - i);
        }
    }
    
    // 设置不同的分红实现率
    const rates = [105, 100, 95, 85, 75];
    const predictions = [];
    
    // 为每个分红实现率计算结果
    for (const rate of rates) {
        // 根据分红实现率调整金额
        const adjustedAmount = rate === 100 ? targetAmount : targetAmount * (0.6 + 0.4 * rate / 100);
        
        // 计算APY
        const apy = calculateAPY(totalInvestment, adjustedAmount, surrenderYear);
        
        // 计算实现该金额需要的年化分红率
        const requiredAnnualRate = Math.pow(adjustedAmount / totalInvestment, 1/surrenderYear) - 1;
        
        predictions.push({
            rate: rate,
            amount: adjustedAmount,
            apy: apy,
            requiredRate: requiredAnnualRate,
            rateClass: getRateClass(rate)
        });
    }
    
    // 显示结果
    document.getElementById('result-company3').textContent = companyNames[company] || company;
    document.getElementById('result-product3').textContent = productName;
    document.getElementById('result-age3').textContent = entryAge;
    document.getElementById('surrender-age3').textContent = surrenderAge;
    document.getElementById('holding-years3').textContent = surrenderYear;
    document.getElementById('total-premium3').textContent = formatCurrency(totalInvestment, currency);
    
    // 填充表格
    const tableBody = document.querySelector('#prediction-table tbody');
    tableBody.innerHTML = '';
    
    predictions.forEach(prediction => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td class="${prediction.rateClass}">${prediction.rate}%</td>
            <td>${formatCurrency(prediction.amount, currency)}</td>
            <td class="${prediction.rateClass}">${(prediction.apy * 100).toFixed(2)}%</td>
            <td>${(prediction.requiredRate * 100).toFixed(2)}%</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    document.getElementById('result3').style.display = 'block';
}

// 读取产品表单数据
function getProductData(index) {
    const productForms = document.querySelectorAll('.product-form');
    const form = productForms[index];
    
    if (!form) return null;
    
    const company = form.querySelector('.multi-company').value;
    const productName = form.querySelector('.multi-product-name').value;
    const currency = form.querySelector('.multi-currency').value;
    const paymentType = form.querySelector('.multi-payment-type').value;
    const premium = parseFormattedNumber(form.querySelector('.multi-premium').value);
    const surrenderAmount = parseFormattedNumber(form.querySelector('.multi-surrender-amount').value);
    
    let premiumYears = 1;
    if (paymentType === 'multiple') {
        premiumYears = parseInt(form.querySelector('.multi-premium-years').value);
    }
    
    if (!productName || isNaN(premium) || isNaN(surrenderAmount)) {
        return null;
    }
    
    return {
        company,
        companyName: companyNames[company] || company,
        productName,
        currency,
        paymentType,
        premium,
        premiumYears,
        surrenderAmount
    };
}

// 计算产品在不同分红实现率下的结果
function calculateProductResults(productData, entryAge, surrenderYear) {
    if (!productData) return null;
    
    const totalInvestment = getTotalInvestment(
        productData.premium, 
        productData.paymentType, 
        productData.premiumYears
    );
    
    // 设置不同的分红实现率
    const rates = [105, 100, 95, 85, 75];
    const results = {};
    
    results.amounts = {};
    results.irrs = {};
    results.apys = {};
    
    // 为每个分红实现率计算结果
    for (const rate of rates) {
        // 调整后的退保金额
        const adjustedAmount = rate === 100 
            ? productData.surrenderAmount 
            : adjustAmountByRate(productData.surrenderAmount, rate);
        
        // 准备现金流数据
        let cashflows = [];
        
        // 添加保费支付（负现金流）
        if (productData.paymentType === 'single') {
            // 一次性付款
            cashflows.push({ year: 0, amount: -productData.premium });
        } else {
            // 分期付款，每年支付一次
            for (let i = 0; i < productData.premiumYears; i++) {
                cashflows.push({ year: i, amount: -productData.premium });
            }
        }
        
        // 添加退保金额（正现金流）
        cashflows.push({ year: surrenderYear, amount: adjustedAmount });
        
        // 计算IRR和APY
        const irr = calculateIRR(cashflows);
        const apy = calculateAPY(totalInvestment, adjustedAmount, surrenderYear);
        
        results.amounts[rate] = adjustedAmount;
        results.irrs[rate] = irr;
        results.apys[rate] = apy;
    }
    
    results.totalInvestment = totalInvestment;
    
    return results;
}

// 多产品对比分析
function compareProducts() {
    const entryAge = parseInt(document.getElementById('multiEntryAge').value);
    const surrenderYear = parseInt(document.getElementById('multiSurrenderYear').value);
    
    if (isNaN(entryAge) || isNaN(surrenderYear)) {
        alert('请填写投保年龄和保单持有年度！');
        return;
    }
    
    const productsData = [];
    
    // 收集所有产品数据
    for (let i = 0; i < 4; i++) {
        const productData = getProductData(i);
        if (productData) {
            if (productData.paymentType === 'multiple' && productData.premiumYears > surrenderYear) {
                alert(`产品${i+1}: 交费年限不能大于保单持有年度！`);
                return;
            }
            
            // 计算每个产品在不同分红实现率下的结果
            const results = calculateProductResults(productData, entryAge, surrenderYear);
            
            productsData.push({
                ...productData,
                results
            });
        }
    }
    
    if (productsData.length === 0) {
        alert('请至少填写一个产品的信息！');
        return;
    }
    
    // 计算退保年龄
    const surrenderAge = entryAge + surrenderYear;
    
    // 更新比较结果标题信息
    document.getElementById('compare-age').textContent = entryAge;
    document.getElementById('compare-surrender-age').textContent = surrenderAge;
    document.getElementById('compare-holding-years').textContent = surrenderYear;
    
    // 填充产品对比卡片
    updateComparisonView();
    
    // 填充详细对比表格
    updateDetailedComparison(productsData);
    
    // 显示结果
    document.getElementById('compareResult').style.display = 'block';
}

// 更新产品对比卡片视图 (根据选定分红实现率)
function updateComparisonView() {
    const selectedRate = parseInt(document.getElementById('rateSelector').value);
    const cardsContainer = document.getElementById('comparisonCards');
    cardsContainer.innerHTML = '';
    
    const productsData = [];
    
    // 收集所有产品数据
    for (let i = 0; i < 4; i++) {
        const productData = getProductData(i);
        if (productData) {
            const entryAge = parseInt(document.getElementById('multiEntryAge').value);
            const surrenderYear = parseInt(document.getElementById('multiSurrenderYear').value);
            
            // 计算每个产品在不同分红实现率下的结果
            const results = calculateProductResults(productData, entryAge, surrenderYear);
            
            productsData.push({
                ...productData,
                results
            });
        }
    }
    
    if (productsData.length === 0) return;
    
    // 根据IRR排序
    productsData.sort((a, b) => {
        return b.results.irrs[selectedRate] - a.results.irrs[selectedRate];
    });
    
    // 创建卡片
    productsData.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'comparison-card';
        
        // 获取IRR排名
        const irrRank = index + 1;
        const rankClass = irrRank <= 3 ? `rank-${irrRank}` : '';
        
        // 获取当前分红率下的结果
        const amount = product.results.amounts[selectedRate];
        const irr = product.results.irrs[selectedRate];
        const apy = product.results.apys[selectedRate];
        
        card.innerHTML = `
            <div class="card-header">
                <div class="card-company">${product.companyName}</div>
                <div class="card-product">${product.productName}</div>
            </div>
            <div class="card-body">
                <div class="card-premium">
                    <div class="card-label">保费投入</div>
                    <div class="card-value">${formatCurrency(product.results.totalInvestment, product.currency)}</div>
                </div>
                <div class="card-result">
                    <div class="card-label">退保金额 (${selectedRate}%实现率)</div>
                    <div class="card-value">${formatCurrency(amount, product.currency)}</div>
                </div>
                <div class="card-rate">
                    <div class="card-label">复利IRR</div>
                    <div class="card-value card-rate-value ${getRateClass(selectedRate)}">
                        ${(irr * 100).toFixed(2)}%
                        <span class="rank-badge ${rankClass}">${irrRank}</span>
                    </div>
                </div>
                <div class="card-rate">
                    <div class="card-label">单利APY</div>
                    <div class="card-value ${getRateClass(selectedRate)}">${(apy * 100).toFixed(2)}%</div>
                </div>
            </div>
        `;
        
        cardsContainer.appendChild(card);
    });
}

// 更新详细对比表格
function updateDetailedComparison(productsData) {
    // 填充退保金额表格
    const amountsBody = document.getElementById('amounts-comparison');
    amountsBody.innerHTML = '';
    
    // 填充IRR表格
    const irrBody = document.getElementById('irr-comparison');
    irrBody.innerHTML = '';
    
    // 填充APY表格
    const apyBody = document.getElementById('apy-comparison');
    apyBody.innerHTML = '';
    
    // 为每个产品创建行
    productsData.forEach(product => {
        // 退保金额行
        const amountRow = document.createElement('tr');
        
        let amountCells = `<td>${product.companyName} - ${product.productName}</td>`;
        
        [105, 100, 95, 85, 75].forEach(rate => {
            const amount = product.results.amounts[rate];
            amountCells += `<td class="${getRateClass(rate)}">${formatCurrency(amount, product.currency)}</td>`;
        });
        
        amountRow.innerHTML = amountCells;
        amountsBody.appendChild(amountRow);
        
        // IRR行
        const irrRow = document.createElement('tr');
        
        let irrCells = `<td>${product.companyName} - ${product.productName}</td>`;
        
        [105, 100, 95, 85, 75].forEach(rate => {
            const irr = product.results.irrs[rate];
            irrCells += `<td class="${getRateClass(rate)}">${(irr * 100).toFixed(2)}%</td>`;
        });
        
        irrRow.innerHTML = irrCells;
        irrBody.appendChild(irrRow);
        
        // APY行
        const apyRow = document.createElement('tr');
        
        let apyCells = `<td>${product.companyName} - ${product.productName}</td>`;
        
        [105, 100, 95, 85, 75].forEach(rate => {
            const apy = product.results.apys[rate];
            apyCells += `<td class="${getRateClass(rate)}">${(apy * 100).toFixed(2)}%</td>`;
        });
        
        apyRow.innerHTML = apyCells;
        apyBody.appendChild(apyRow);
    });
}

// 显示不同的对比表格
function showComparisonTab(tabName) {
    // 隐藏所有表格
    document.querySelectorAll('.comparison-tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // 取消所有按钮的active状态
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // 显示选中的表格
    document.getElementById(`${tabName}-tab`).style.display = 'block';
    
    // 设置选中按钮的active状态
    document.querySelector(`.tab-button[onclick="showComparisonTab('${tabName}')"]`).classList.add('active');
}

// 检测移动设备并调整UI
function adjustForMobileDevices() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // 根据需要动态调整表格和其他元素
        document.querySelectorAll('table').forEach(table => {
            if (table.parentElement) {
                table.parentElement.style.overflowX = 'auto';
                table.parentElement.style.webkitOverflowScrolling = 'touch';
            }
        });
        
        // 调整输入框字体大小，确保在iOS上显示正常
        document.querySelectorAll('input, select').forEach(input => {
            input.style.fontSize = '16px';
        });
        
        // 确保表格容器允许滚动
        document.querySelectorAll('.table-scroll-container').forEach(container => {
            container.style.overflowX = 'auto';
        });
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 初始化交费方式选择器状态
    togglePaymentType();
    togglePaymentType3();
    toggleMultiCommonPaymentType();
    
    // 初始化货币符号
    updateCurrencySymbols();
    updateCurrencySymbols3();
    
    // 设置货币选择变化监听
    document.getElementById('currency').addEventListener('change', updateCurrencySymbols);
    document.getElementById('currency3').addEventListener('change', updateCurrencySymbols3);
    
    // 初始格式化已有数字输入
    const numberInputs = document.querySelectorAll('input[type="text"]');
    numberInputs.forEach(input => formatNumber(input));
    
    // 初始化产品选项卡
    document.querySelectorAll('.product-tab').forEach((tab, index) => {
        tab.addEventListener('click', () => switchProductForm(index));
    });
    
    // 初始化多产品表单内容
    for (let i = 1; i < 4; i++) {
        const sourceForm = document.querySelector('.product-form[data-index="0"]');
        const targetForm = document.querySelector(`.product-form[data-index="${i}"]`);
        
        if (sourceForm && targetForm) {
            targetForm.innerHTML = sourceForm.innerHTML;
            
            // 更新第二表单中的事件处理程序
            const paymentTypeSelect = targetForm.querySelector('.multi-payment-type');
            if (paymentTypeSelect) {
                paymentTypeSelect.setAttribute('onchange', `toggleMultiPaymentType(${i})`);
            }
            
            const currencySelect = targetForm.querySelector('.multi-currency');
            if (currencySelect) {
                currencySelect.setAttribute('onchange', `updateMultiCurrencySymbol(${i})`);
            }
        }
    }
    
    // 初始只显示第一个产品表单
    switchProductForm(0);
    
    // 调用移动设备适配函数
    adjustForMobileDevices();
    
    // 添加窗口大小变化时的处理
    window.addEventListener('resize', adjustForMobileDevices);
});